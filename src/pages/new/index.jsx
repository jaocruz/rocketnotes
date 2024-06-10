import { Textarea } from "../../components/textarea";
import { NoteItem } from "../../components/noteitem";
import { Section } from "../../components/section";
import { Button } from "../../components/button";
import { Header } from "../../components/header";
import { Input } from "../../components/input";

import { Link } from "react-router-dom";

import { Container, Form } from "./styles";

export function New(){
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
            <NoteItem value="https://rocketseat.com.br"/>
            <NoteItem isNew placeholder="Novo link"/>
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              <NoteItem value="React"/>
              <NoteItem isNew placeholder="Novo marcador"/>
            </div>
          </Section>

          <Button title="Salvar"/>

        </Form>

      </main>

    </Container>
  )
}