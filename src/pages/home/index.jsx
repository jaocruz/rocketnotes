import { useState, useEffect } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";

import { api } from "../../services/api";

import { Container, Brand, Menu, Search, Content, NewNote } from "./styles";

import { Note } from "../../components/note";
import { Input } from "../../components/input";
import { Header } from "../../components/header";
import { Section } from "../../components/section";
import { ButtonText } from "../../components/buttonText";

export function Home(){
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);

  function handleTagSelected(tagName){
    const alreadySelected =tagsSelected.includes(tagName);

    if(alreadySelected){
      const filteredTags = tagsSelected.filter(tag => tag !== tagName);
      setTagsSelected(filteredTags);
    }else{
      setTagsSelected(prevState => [...prevState, tagName]);
    }
  }

  useEffect(() => {
    async function fetchTags(){
      const response = await api.get("/tags");
      setTags(response.data);
    }

    fetchTags();
  }, [])

  return(
    <Container>

      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText
            title="Todos"
            onClick={() => handleTagSelected("all")}
            $isactive={tagsSelected.length === 0}
          />
        </li>

        {
          tags && tags.map(tag => (
            <li key={String(tag.id)}>
              <ButtonText
                title={tag.name}
                onClick={() => handleTagSelected(tag.name)}
                $isactive={tagsSelected.includes(tag.name)}
              />
            </li>
          ))
        }
      </Menu>

      <Search>
        <Input placeholder="Pesquisar pelo título" icon={FiSearch}/>
      </Search>

      <Content>
        <Section title="Minhas Notas">
          <Note data={{
            title: "React",
            tags: [
              {id: "1", name: "react"},
              {id: "2", name: "nodejs"}
              ]
            }}
          />
          
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus/>
        Criar Nota
      </NewNote>

    </Container>
  )
};