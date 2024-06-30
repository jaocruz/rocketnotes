import { useState } from "react";

import { Textarea } from "../../components/textarea";
import { NoteItem } from "../../components/noteitem";
import { Section } from "../../components/section";
import { Button } from "../../components/button";
import { Header } from "../../components/header";
import { Input } from "../../components/input";

import { Link } from "react-router-dom";

import { Container, Form } from "./styles";

export function New(){

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  function handleAddLink(){
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deleted){
    setLinks(prevState => prevState.filter(link => link !== deleted));
  }

  function handleAddTag(){
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  }

  return(
    <Container>

      <Header/>

      <main>

        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/">Voltar</Link>
          </header>

          <Input
            placeholder="Título"
          />

          <Textarea
            placeholder="Observações"
          />

          <Section title="Links Úteis">
            {
              links.map((link, index) => (
                <NoteItem
                  key={String(index)}
                  value={link}
                  onClick={() => handleRemoveLink(link)}
                />
              ))
            }

            <NoteItem
              isNew
              placeholder="Novo link"
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {
                tags.map((tag, index) => (
                  <NoteItem
                    key={String(index)}
                    value={tag}
                    onClick={() => {}}
                  />  
                ))
                
              }

              <NoteItem
                isNew
                placeholder="Novo marcador"
                onChange={e => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button title="Salvar"/>

        </Form>

      </main>

    </Container>
  )
}