import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Textarea } from "../../components/textarea";
import { NoteItem } from "../../components/noteitem";
import { Section } from "../../components/section";
import { Button } from "../../components/button";
import { Header } from "../../components/header";
import { Input } from "../../components/input";

import { api } from "../../services/api";

import { Link } from "react-router-dom";

import { Container, Form } from "./styles";

export function New(){
  const [title, SetTitle] = useState("");
  const [description, SetDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

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

  function handleRemoveTag(deleted){
    setTags(prevState => prevState.filter(tag => tag !== deleted));
  }

  async function handleNewNote(){
    if(!title){
      return alert("Digite o título da nota.")
    }

    if(newLink){
      return alert("Você se esqueceu de adicionar o link! Clique para adicionar ou deixe o campo vazio.")
    }

    if(newTag){
      return alert("Você se esqueceu de adicionar a tag! Clique para adicionar ou deixe o campo vazio.")
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    });

    alert("Nota criada com sucesso!");
    navigate("/")
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
            onChange={e => SetTitle(e.target.value)}
          />

          <Textarea
            placeholder="Observações"
            onChange={e => SetDescription(e.target.value)}
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
                    onClick={() => handleRemoveTag(tag)}
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

          <Button
            title="Salvar"
            onClick={handleNewNote}
          />

        </Form>

      </main>

    </Container>
  )
}