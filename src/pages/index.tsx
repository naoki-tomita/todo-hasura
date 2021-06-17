import { NextPage } from "next";
import React from "react";
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

const Loader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      css={css`
        display: block;
        margin: auto;
      `}
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <defs>
        <mask id="ldio-45vwvhknaff-mask">
          <circle cx="50" cy="50" r="45" fill="#fff"></circle>
        </mask>
      </defs>
      <circle cx="50" cy="50" r="45" fill="#71bab9"></circle>

      <path
        d="M 17.5 30 L 32.5 30 L 132.5 130 L 117.5 170 L 17.5 70 Z"
        mask="url(#ldio-45vwvhknaff-mask)"
        fill="#448d8c"
      >
        <animate
          attributeName="d"
          dur="1s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          values="M 17.5 18 L 32.5 18 L 132.5 118 L 117.5 182 L 17.5 82 Z;M 17.5 30 L 32.5 30 L 132.5 130 L 117.5 170 L 17.5 70 Z;M 17.5 30 L 32.5 30 L 132.5 130 L 117.5 170 L 17.5 70 Z"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.2s"
        ></animate>
      </path>
      <path
        d="M 42.5 30 L 57.5 30 L 157.5 130 L 142.5 170 L 42.5 70 Z"
        mask="url(#ldio-45vwvhknaff-mask)"
        fill="#448d8c"
      >
        <animate
          attributeName="d"
          dur="1s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          values="M 42.5 20.999999999999996 L 57.5 20.999999999999996 L 157.5 121 L 142.5 179 L 42.5 79 Z;M 42.5 30 L 57.5 30 L 157.5 130 L 142.5 170 L 42.5 70 Z;M 42.5 30 L 57.5 30 L 157.5 130 L 142.5 170 L 42.5 70 Z"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.1s"
        ></animate>
      </path>
      <path
        d="M 67.5 30 L 82.5 30 L 182.5 130 L 167.5 170 L 67.5 70 Z"
        mask="url(#ldio-45vwvhknaff-mask)"
        fill="#448d8c"
      >
        <animate
          attributeName="d"
          dur="1s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          values="M 67.5 24 L 82.5 24 L 182.5 124 L 167.5 176 L 67.5 76 Z;M 67.5 30 L 82.5 30 L 182.5 130 L 167.5 170 L 67.5 70 Z;M 67.5 30 L 82.5 30 L 182.5 130 L 167.5 170 L 67.5 70 Z"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        ></animate>
      </path>

      <rect x="17.5" y="30" width="15" height="40" fill="#e15b64">
        <animate
          attributeName="y"
          dur="1s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          values="18;30;30"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.2s"
        ></animate>
        <animate
          attributeName="height"
          dur="1s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          values="64;40;40"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.2s"
        ></animate>
      </rect>

      <rect x="42.5" y="30" width="15" height="40" fill="#f47e60">
        <animate
          attributeName="y"
          dur="1s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          values="20.999999999999996;30;30"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.1s"
        ></animate>
        <animate
          attributeName="height"
          dur="1s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          values="58.00000000000001;40;40"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.1s"
        ></animate>
      </rect>

      <rect x="67.5" y="30" width="15" height="40" fill="#f8b26a">
        <animate
          attributeName="y"
          dur="1s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          values="24;30;30"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        ></animate>
        <animate
          attributeName="height"
          dur="1s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          values="52;40;40"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        ></animate>
      </rect>
    </svg>
  );
};

const client = new ApolloClient({
  uri: "http://localhost:8080/v1/graphql",
  cache: new InMemoryCache(),
});

const Selector: VFC<{
  options: Array<{
    value: string;
    name: string;
  }>;
  onChange: (value: string) => void;
  value: string;
}> = ({ options, onChange, value }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        css={css`
          border: none;
          border-radius: 4px;
          background-color: #ffffff;
          font-size: 16px;
          padding: 4px 8px;
          filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.3));

          &:hover {
            background-color: #f0f0f0;
          }
        `}
        onClick={() => setOpen((b) => !b)}
      >
        {options.find((it) => it.value === value)?.name} ▼
      </button>
      {open && (
        <div
          css={css`
            position: relative;
          `}
        >
          <ul
            css={css`
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
            `}
          >
            {options.map((it, i) => (
              <li
                key={i}
                css={css`
                  border-bottom: solid 1px #f4f4f4;
                  &:last-child {
                    border-bottom: none;
                  }
                  &:hover {
                    background-color: #f4f4f4;
                  }

                  &:first-child {
                    border-radius: 4px 4px 0 0;
                  }

                  &:last-child {
                    border-radius: 0 0 4px 4px;
                  }
                `}
              >
                <a
                  css={css`
                    display: block;
                    padding: 4px 8px;
                    cursor: pointer;
                  `}
                  onClick={() => (onChange(it.value), setOpen(false))}
                >
                  <div>{it.name || "　"}</div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

function useTodo(opt?: { filter?: { done?: boolean | null } }) {
  const { data, loading, refetch } = useTodoQuery({
    variables: { done: opt.filter.done },
  });
  const [add] = useMutation<AddTodoMutation, AddTodoMutationVariables>(
    AddTodoDocument,
    {
      refetchQueries: [
        { query: TodoDocument, variables: { done: opt.filter.done } },
      ],
    }
  );
  const [update] = useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(
    UpdateTodoDocument,
    {
      refetchQueries: [
        { query: TodoDocument, variables: { done: opt.filter.done } },
      ],
    }
  );
  return {
    data,
    loading,
    add,
    update,
    refetch,
  };
}

const Index: NextPage = () => {
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<"done" | "undone" | null>(null);
  const { data, loading, add, update, refetch } = useTodo({
    filter: { done: filter ? filter === "done" : null },
  });
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
    <>
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
              padding: 8px;
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
          {loading && (
            <div>
              <Loader />
            </div>
          )}
          {!loading && (
            <div>
              <div
                css={css`
                  display: flex;
                  justify-content: flex-end;
                  margin-bottom: 8px;
                `}
              >
                <Selector
                  options={[
                    { name: "all", value: null },
                    { name: "done", value: "done" },
                    { name: "undone", value: "undone" },
                  ]}
                  value={filter}
                  onChange={(e: any) => setFilter(e)}
                />
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
    </>
  );
};

const WrappedIndex = () => (
  <ApolloProvider client={client}>
    <Index />
  </ApolloProvider>
);
export default WrappedIndex;
