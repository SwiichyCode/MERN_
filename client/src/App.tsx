import React, { useEffect } from "react";
import styled from "styled-components";

interface IBook {
  title: string;
  author: string;
}

export const App = () => {
  const [data, setData] = React.useState<any>([]);
  const [author, setAuthor] = React.useState<any>("");
  const [value, setValue] = React.useState<IBook>({
    title: "",
    author: "",
  });

  useEffect(() => {
    fetch("http://localhost:1337/books/get")
      .then((res) => res.json())
      .then((data) => setData((data = data.books)));
  }, []);

  const addBook = () => {
    fetch("http://localhost:1337/books/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Test",
        author: "Swiichy",
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const addAuthor = () => {
    fetch("http://localhost:1337/authors/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: author,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      {data?.map((item: { name: string }) => {
        return <div>{item.name}</div>;
      })}

      <InputWrapper>
        <input
          name="author"
          placeholder="add author"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={addAuthor}>Add Author</button>
      </InputWrapper>

      <InputWrapper>
        <input
          name="title"
          placeholder="title"
          onChange={(e) => setValue({ ...value, title: e.target.value })}
        />
        <input
          name="author"
          placeholder="author"
          onChange={(e) => setValue({ ...value, author: e.target.value })}
        />
        <button onClick={addBook}>Add Book</button>
      </InputWrapper>
    </div>
  );
};

const InputWrapper = styled.div``;
