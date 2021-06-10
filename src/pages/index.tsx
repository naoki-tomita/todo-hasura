import { NextPage } from "next";
import { css } from "@emotion/react";
import {
  ApolloClient,
  InMemoryCache,
  useMutation,
  ApolloProvider,
} from "@apollo/client";
import { KeyboardEvent, useEffect, useState, VFC } from "react";
import {
  TodoDocument,
  AddTodoDocument,
  AddTodoMutation,
  AddTodoMutationVariables,
  UpdateTodoMutation,
  UpdateTodoDocument,
  UpdateTodoMutationVariables,
  useTodoQuery,
} from "../generated/graphql";

const client = new ApolloClient({
  uri: "http://localhost:8080/v1/graphql",
  cache: new InMemoryCache(),
});

const Selector: VFC<{
  options: Array<{
    value: string;
    name: string;
  }>
  onChange: (value: string) => void;
  value: string;
}> = ({ options, onChange, value }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen((b) => !b)}>
        {options.find(it => it.value === value)?.name} ▼
      </button>
      {open && (
        <div css={css`
          position: relative;
        `}>
          <ul css={css`
            position: absolute;
            top: 5px;
            right: 0;
            margin: 0;
            padding: 0;
            list-style: none;
            background-color: #ffffff;
            filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.3));
            border-radius: 4px;
            z-index: 2;
          `}>
            {options.map((it, i) =>
              <li key={i} css={css`
                border-bottom: solid 1px #f4f4f4;
                &:last-child {
                  border-bottom: none;
                }
                &:hover {
                  background-color: #f4f4f4;
                }
              `}>
                <a css={css`
                  display: block;
                  padding: 8px;
                  cursor: pointer;
                `} onClick={() => (onChange(it.value), setOpen(false))}>
                  <div>{it.name || "　"}</div>
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

function useTodo(opt?: { filter?: { done?: boolean | null } }) {
  const { data, loading, refetch } = useTodoQuery({ variables: { done: opt.filter.done } });
  const [add] = useMutation<AddTodoMutation, AddTodoMutationVariables>(
    AddTodoDocument,
    { refetchQueries: [{ query: TodoDocument, variables: { done: opt.filter.done } }] },
  );
  const [update] = useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(
    UpdateTodoDocument,
    { refetchQueries: [{ query: TodoDocument, variables: { done: opt.filter.done } }] }
  );
  return {
    data, loading, add, update, refetch
  };
}

const Index: NextPage = () => {
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<"done" | "undone" | null>(null);
  const { data, loading, add, update, refetch } = useTodo({ filter: { done: filter ? filter === "done" : null } });
  useEffect(() => {
    refetch();
  }, [filter]);

  async function onSubmit(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      await add({ variables: { title, done: false } });
      setTitle("");
    }
  }

  async function changeDone(id: number, done: boolean) {
    await update({ variables: { id, done } });
  }

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        font-size: 18px;
        color: #444444;
      `}
    >
      <div
        css={css`
          width: 320px;
          padding: 24px;
          background-color: #f4f4f4;
          filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.3));
          border-radius: 8px;
        `}
      >
        <input
          css={css`
            display: block;
            width: 100%;
            box-sizing: border-box;
            background-color: #fcfcfc;
            outline: none;
            border: none;
            border-bottom: 1px solid #fcfcfc;
            transition: 0.3s ease-in;
            margin-bottom: 8px;
            padding: 4px;
            font-size: 20px;
            color: #444444;

            &:focus {
              border-bottom: 1px solid #bfbfbf;
            }
            &::placeholder {
              color: #bfbfbf;
            }
          `}
          placeholder="What are you want to do ?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={onSubmit}
        />
        {loading && <div>loading...</div>}
        {!loading && (
          <div>
            <div css={css`
              display: flex;
              justify-content: flex-end;
            `}>
              <Selector options={[
                { name: "all", value: null },
                { name: "done", value: "done" },
                { name: "undone", value: "undone" }
              ]} value={filter} onChange={(e: any) => setFilter(e)} />
            </div>
          <ul
            css={css`
              list-style: none;
              padding: 0;
              margin: 0;
            `}
          >
            {data.todo.map((it) => (
              <li
                css={css`
                  transition: 0.3s;
                  border-radius: 4px;

                  &:hover {
                    background-color: #fcfcfc;
                    filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.3));
                  }
                `}
                key={it.id}
              >
                <a
                  css={css`
                    display: flex;
                    padding: 12px;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                  `}
                  onClick={() => changeDone(it.id, !it.done)}
                >
                  {it.title}
                  <input type="checkbox" checked={it.done} readOnly />
                </a>
              </li>
            ))}
          </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const WrappedIndex = () => (
  <ApolloProvider client={client}>
    <Index />
  </ApolloProvider>
);
export default WrappedIndex;
