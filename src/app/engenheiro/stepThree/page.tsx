"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import Image from "next/image";
import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from "docx";

const secoes = [
  {
    titulo: "UNIDADES PRIVATIVAS",
    subtitulos: [
      {
        nome: "Sala de Estar/Jantar",
        campos: [
          { name: "sala_piso", label: "Piso", options: ["Porcelanato ou laminado"] },
          { name: "sala_parede", label: "Parede", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
          { name: "sala_teto", label: "Teto", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
          { name: "sala_rodape", label: "Rodapé", options: ["Porcelanato ou Laminado, h= 5cm"] },
          { name: "sala_soleira", label: "Soleira", options: ["Mármore ou granito."] },
          { name: "sala_peitoril", label: "Peitoril", options: ["Metálico"] },
          { name: "sala_esquadria", label: "Esquadria", options: ["Alumínio pintado de branco"] },
          { name: "sala_vidro", label: "Vidro", options: ["Liso incolor."] },
          { name: "sala_porta", label: "Porta", options: ["Porta semi–ôca comum pintada c/ esmalte sintético."] },
          { name: "sala_ferragem", label: "Ferragem", options: ["Acabamento cromado."] },
          { name: "sala_inst_eletrica", label: "Inst. Elétrica", options: ["Pontos de luz no teto, tomadas de corrente e interruptores"] },
          { name: "sala_inst_comunic", label: "Inst. Comunic.", options: ["Pontos secos de comunicação e de antena de TV."] },
        ],
      },
      {
        nome: "Circulação",
        campos: [
          { name: "circ_piso", label: "Piso", options: ["Porcelanato ou laminado"] },
          { name: "circ_parede", label: "Parede", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
          { name: "circ_teto", label: "Teto", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
          { name: "circ_rodape", label: "Rodapé", options: ["Porcelanato ou Laminado, h= 5cm"] },
          { name: "circ_inst_eletrica", label: "Inst. Elétrica", options: ["Pontos de luz no teto, tomadas de corrente e interruptores"] },
        ],
      },
      {
        nome: "Quarto e Suíte",
        campos: [
          { name: "quarto_piso", label: "Piso", options: ["Porcelanato ou laminado."] },
          { name: "quarto_parede", label: "Parede", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
          { name: "quarto_teto", label: "Teto", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
          { name: "quarto_rodape", label: "Rodapé", options: ["Porcelanato ou Laminado, h= 5cm."] },
          { name: "quarto_soleira", label: "Soleira", options: ["Mármore ou granito."] },
          { name: "quarto_peitoril", label: "Peitoril", options: ["Metálico."] },
          { name: "quarto_esquadria", label: "Esquadria", options: ["Alumínio pintado de branco."] },
          { name: "quarto_vidro", label: "Vidro", options: ["Liso incolor."] },
          { name: "quarto_porta", label: "Porta", options: ["Porta semi–ôca comum pintada c/ esmalte sintético."] },
          { name: "quarto_ferragem", label: "Ferragem", options: ["Acabamento cromado."] },
          { name: "quarto_inst_eletrica", label: "Inst. Elétrica", options: ["Pontos de luz no teto, tomadas de corrente e interruptores."] },
          { name: "quarto_inst_comunic", label: "Inst. Comunic.", options: ["Pontos secos de comunicação e de antena de TV."] },
          { name: "quarto_ar_cond", label: "Ar Condicionado", options: ["Infraestrutura para high wall com condensadora axial."] },
        ],
      },
      {
        nome: "Sanitário/ Lavabo",
        campos: [
          { name: "san_piso", label: "Piso", options: ["Cerâmica."] },
          { name: "san_parede", label: "Parede", options: ["Cerâmica até o teto."] },
          { name: "san_teto", label: "Teto", options: ["Forro de gesso."] },
          { name: "san_filete", label: "Filete", options: ["Mármore ou granito L=3,5cm."] },
          { name: "san_cordao_box", label: "Cordão de Box", options: ["Mármore ou granito."] },
          { name: "san_bancada", label: "Bancada", options: ["Em mármore ou granito com cuba em louça cor branca"] },
          { name: "san_porta", label: "Porta", options: ["Porta semi-ôca comum pintura c/ esmalte sintético."] },
          { name: "san_peitoril", label: "Peitoril", options: ["Metálico."] },
          { name: "san_ferragem", label: "Ferragem", options: ["Acabamento cromado."] },
          { name: "san_esquadria", label: "Esquadria", options: ["Alumínio pintado de branco."] },
          { name: "san_vidro", label: "Vidro", options: ["Pontilhado Incolor."] },
          { name: "san_metal", label: "Metal Sanitário", options: ["Torneira para Lavatório, registro de gaveta e registro de pressão com acabamento cromado ."] },
          { name: "san_loucas", label: "Louças", options: ["Vaso Sanitário com Caixa Acoplada em louça cor branca."] },
          { name: "san_inst_eletrica", label: "Inst. Elétrica", options: ["Pontos de luz no teto, tomada de corrente e interruptor da Prime, Alumbra, Cemar ou Fame na cor branco."] },
          { name: "san_inst_hidraulica", label: "Inst. Hidráulica", options: ["Sifão em PVC, esgoto em PVC, rede de água fria e ducha higiênica em PEX."] },
        ],
      },
      {
        nome: "Cozinha/ Área de Serviço",
        campos: [
          { name: "coz_piso", label: "Piso", options: ["Cerâmica."] },
          { name: "coz_parede", label: "Parede", options: ["Cerâmica até o teto."] },
          { name: "coz_teto", label: "Teto", options: ["Pintura látex PVA sobre gesso ou argamassa de regularização PVA."] },
          { name: "coz_filete", label: "Filete", options: ["Mármore ou granito L=3,5cm."] },
          { name: "coz_bancada", label: "Bancada", options: ["Em mármore ou granito."] },
          { name: "coz_cuba", label: "Cuba", options: ["Inox."] },
          { name: "coz_peitoril", label: "Peitoril", options: ["Metálico."] },
          { name: "coz_tanque", label: "Tanque", options: ["Louça cor branca."] },
          { name: "coz_esquadrias", label: "Esquadrias", options: ["Alumínio pintado de branco."] },
          { name: "coz_metais", label: "Metais", options: ["Torneiras e registro de gaveta com acabamento cromado."] },
          { name: "coz_inst_eletricas", label: "Inst. Elétricas", options: ["Ponto de luz no teto, tomadas de corrente e interruptores."] },
          { name: "coz_inst_hidraulica", label: "Inst. Hidráulica", options: ["Rede de água fria em PEX e esgoto em PVC"] },
          { name: "coz_inst_comunic", label: "Inst. Comunicação", options: ["Tubulação seca."] },
        ],
      },
      {
        nome: "Área Técnica",
        campos: [
          { name: "areaTec_piso", label: "Piso", options: ["Em concreto desempolado."] },
          { name: "areaTec_parede", label: "Parede", options: ["Textura acrílica."] },
          { name: "areaTec_teto", label: "Teto", options: ["Pintura ou textura acrílica."] },
          { name: "areaTec_gradil", label: "Gradil", options: ["Em perfil metálico pintado de branco."] },
        ],
      },
      {
        nome: "Varanda",
        campos: [
          { name: "var_piso", label: "Piso", options: ["Porcelanato."] },
          { name: "var_parede", label: "Parede", options: ["Textura Acrílica ou Pastilha Cerâmica, conforme definido em projeto arquitetônico."] },
          { name: "var_teto", label: "Teto", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA ou Forro de gesso."] },
          { name: "var_rodape", label: "Rodapé", options: ["Porcelanato ou Laminado, h=5cm."] },
          { name: "var_porta", label: "Porta", options: ["Alumínio pintado de branco com vidro liso."] },
          { name: "var_inst_eletrica", label: "Inst. Elétrica", options: ["Ponto de luz no teto."] },
          { name: "var_guardacorpo", label: "Guarda Corpo", options: ["Em perfil metálico pintado de branco."] },
        ],
      },
      {
        nome: "Garden",
        campos: [
          { name: "garden_piso", label: "Piso", options: ["Grama"] },
          { name: "garden_gradil", label: "Gradil", options: ["Em perfil metálico pintado de branco."] },
        ],
      },
    ],
  },

  {
    titulo: "ÁREA COMUM",
    subtitulos: [
      {
        nome: "Guarita",
        campos: [
          { name: "guarita_piso", label: "Piso", options: ["Cerâmica."] },
          { name: "guarita_parede_interna", label: "Parede Interna", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
          { name: "guarita_teto", label: "Teto", options: ["Forro de gesso."] },
          { name: "guarita_parede_externa", label: "Parede Externa", options: ["Acabamento em textura acrílica."] },
          { name: "guarita_rodape", label: "Rodapé", options: ["Cerâmica, h=5 cm."] },
          { name: "guarita_soleira", label: "Soleira", options: ["Mármore ou granito."] },
          { name: "guarita_peitoril", label: "Peitoril", options: ["Metálico ou granito."] },
          { name: "guarita_ferragens", label: "Ferragens", options: ["Acabamento cromado."] },
          { name: "guarita_porta_ext", label: "Porta externa", options: ["Alumínio pintado na cor branca com vidro liso."] },
          { name: "guarita_esquadrias", label: "Esquadrias", options: ["Alumínio pintado de branco."] },
          { name: "guarita_vidro", label: "Vidro", options: ["Liso incolor."] },
          { name: "guarita_inst_eletricas", label: "Inst. Elétricas", options: ["Ponto de luz no teto com luminária, tomada de corrente e interruptor na cor branco."] },
          { name: "guarita_inst_comunic", label: "Inst. Comunic.", options: ["Tubulação seca."] },
        ],
      },
      {
        nome: "Gourmets",
        campos: [
          { name: "gour_piso", label: "Piso", options: ["Porcelanato."] },
          { name: "gour_parede_interna", label: "Parede Interna", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA. Acima das bancadas será aplicado revestimento cerâmico. Nas demais paredes textura acrílica ou pintura acrílica."] },
          { name: "gour_teto", label: "Teto", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
          { name: "gour_rodape", label: "Rodapé", options: ["Porcelanato, h=5 cm."] },
          { name: "gour_tabeira", label: "Tabeira", options: ["Mármore ou granito."] },
          { name: "gour_bancada", label: "Bancada", options: ["Mármore ou granito."] },
          { name: "gour_cuba", label: "Cuba", options: ["Inox."] },
          { name: "gour_metais", label: "Metais", options: ["Torneira para pia com acabamento cromado."] },
          { name: "gour_tampo_balcao", label: "Tampo do balcão", options: ["Mármore ou granito."] },
          { name: "gour_churrasqueira", label: "Churrasqueira", options: ["Pré-moldada ou alvenaria."] },
          { name: "gour_inst_eletricas", label: "Inst. Elétricas", options: ["Ponto de luz no teto com luminária, tomada de corrente e interruptor na cor branco."] },
          { name: "gour_inst_hidraulica", label: "Inst. Hidráulica", options: ["Engate, sifão, rede de água fria e esgoto em PVC."] },
          { name: "gour_inst_comunic", label: "Inst. Comunic.", options: ["Tubulação seca."] },
        ],
      },
      {
        nome: "Quiosques",
        campos: [
          { name: "quiosque_piso", label: "Piso", options: ["Porcelanato."] },
          { name: "quiosque_parede_interna", label: "Parede Interna", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA. Acima das bancadas será aplicado revestimento cerâmico. Nas demais paredes textura acrílica ou pintura acrílica."] },
          { name: "quiosque_teto", label: "Teto", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
          { name: "quiosque_rodape", label: "Rodapé", options: ["Porcelanato, h=5 cm."] },
          { name: "quiosque_tabeira", label: "Tabeira", options: ["Mármore ou granito."] },
          { name: "quiosque_bancada", label: "Bancada", options: ["Mármore ou granito."] },
          { name: "quiosque_cuba", label: "Cuba", options: ["Inox."] },
          { name: "quiosque_metais", label: "Metais", options: ["Torneira para pia com acabamento cromado."] },
          { name: "quiosque_tampo", label: "Tampo do balcão", options: ["Mármore ou granito."] },
          { name: "quiosque_churrasqueira", label: "Churrasqueira", options: ["Pré-moldada ou alvenaria."] },
          { name: "quiosque_inst_eletricas", label: "Inst. Elétricas", options: ["Ponto de luz no teto com luminária, tomada de corrente e interruptor na cor branco."] },
          { name: "quiosque_inst_hidraulica", label: "Inst. Hidráulica", options: ["Engate, sifão, rede de água fria e esgoto em PVC."] },
          { name: "quiosque_inst_comunic", label: "Inst. Comunic.", options: ["Tubulação seca."] },
        ],
      },
      {
        nome: "Copa Funcionários",
        campos: [
          { name: "copa_piso", label: "Piso", options: ["Porcelanato."] },
          { name: "copa_parede_interna", label: "Parede Interna", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA. Acima das bancadas será aplicado revestimento cerâmico. Nas demais paredes textura acrílica ou pintura acrílica."] },
          { name: "copa_teto", label: "Teto", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
          { name: "copa_rodape", label: "Rodapé", options: ["Porcelanato, h=5 cm."] },
          { name: "copa_porta", label: "Porta", options: ["Alumínio pintado de branco."] },
          { name: "copa_esquadria", label: "Esquadria", options: ["Alumínio pintado de branco."] },
          { name: "copa_vidro", label: "Vidro", options: ["Liso."] },
          { name: "copa_soleira", label: "Soleira", options: ["Mármore ou granito."] },
          { name: "copa_peitoril", label: "Peitoril", options: ["Metálico ou granito."] },
          { name: "copa_bancada", label: "Bancada", options: ["Mármore ou granito."] },
          { name: "copa_cuba", label: "Cuba", options: ["Inox."] },
          { name: "copa_metais", label: "Metais", options: ["Torneira para pia com acabamento cromado."] },
          { name: "copa_inst_eletricas", label: "Inst. Elétricas", options: ["Ponto de luz no teto com luminária, tomada de corrente e interruptor na cor branco."] },
          { name: "copa_inst_hidraulica", label: "Inst. Hidráulica", options: ["Engate, sifão, rede de água fria e esgoto em PVC."] },
          { name: "copa_inst_comunic", label: "Inst. Comunic.", options: ["Tubulação seca."] },
        ],
      },
      {
        nome: "Petplay",
        campos: [
          { name: "petplay_piso", label: "Piso", options: ["Grama"] },
          { name: "petplay_fechamento", label: "Fechamento", options: ["Tela alambrado ou tela de proteção."] },
          { name: "petplay_equip", label: "Equipamentos", options: ["A serem definidos"] },
        ],
      },
      {
        nome: "Parque Infantil",
        campos: [
          { name: "parque_piso", label: "Piso", options: ["Intertravado emborrachado ou grama."] },
          { name: "parque_brinq", label: "Brinquedos", options: ["A serem definidos."] },
        ],
      },
      {
        nome: "Brinquedoteca",
        campos: [
          { name: "brinq_piso", label: "Piso", options: ["Porcelanato"] },
          { name: "brinq_parede", label: "Parede", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
          { name: "brinq_teto", label: "Teto", options: ["Forro de gesso."] },
          { name: "brinq_rodape", label: "Rodapé", options: ["Porcelanato, h=5 cm."] },
          { name: "brinq_soleira", label: "Soleira", options: ["Mármore ou granito."] },
          { name: "brinq_peitoril", label: "Peitoril", options: ["Metálico ou granito."] },
          { name: "brinq_ferragens", label: "Ferragens", options: ["Acabamento cromado."] },
          { name: "brinq_esquadria", label: "Esquadria", options: ["Alumínio pintado de branco."] },
          { name: "brinq_vidro", label: "Vidro", options: ["Liso incolor."] },
          { name: "brinq_inst_eletricas", label: "Inst. Elétricas", options: ["Ponto de luz no teto com luminária, tomada de corrente e interruptor na cor branco."] },
        ],
      },
      {
        nome: "Salão de Festas",
        campos: [
          { name: "sf_piso", label: "Piso", options: ["Porcelanato."] },
          { name: "sf_parede", label: "Parede", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA. Acima das bancadas será aplicado revestimento cerâmico. Nas demais paredes textura acrílica ou pintura acrílica."] },
          { name: "sf_teto", label: "Teto", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
          { name: "sf_rodape", label: "Rodapé", options: ["Porcelanato, h=5 cm."] },
          { name: "sf_porta", label: "Porta", options: ["Alumínio pintado de branco."] },
          { name: "sf_esquadria", label: "Esquadria", options: ["Alumínio pintado de branco."] },
          { name: "sf_vidro", label: "Vidro", options: ["Liso incolor."] },
          { name: "sf_soleira", label: "Soleira", options: ["Mármore ou granito."] },
          { name: "sf_peitoril", label: "Peitoril", options: ["Metálico ou granito."] },
          { name: "sf_bancada", label: "Bancada", options: ["Mármore ou granito."] },
          { name: "sf_cuba", label: "Cuba", options: ["Inox."] },
          { name: "sf_metais", label: "Metais", options: ["Torneira para pia com acabamento cromado."] },
          { name: "sf_tampo_balcao", label: "Tampo do Balcão", options: ["Mármore ou granito."] },
          { name: "sf_inst_eletricas", label: "Inst. Elétricas", options: ["Ponto de luz no teto com luminária, tomada de corrente e interruptor na cor branco."] },
          { name: "sf_inst_hidraulica", label: "Inst. Hidráulica", options: ["Engate, sifão, rede de água fria e esgoto em PVC."] },
          { name: "sf_inst_comunic", label: "Inst. Comunic.", options: ["Tubulação seca."] },
        ],
      },
      {
        nome: "Bicicletário",
        campos: [
          { name: "bicic_piso", label: "Piso", options: ["Em concreto desempolado."] },
          { name: "bicic_parede", label: "Parede", options: ["Pintura acrílica ou textura acrílica."] },
          { name: "bicic_teto", label: "Teto", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
        ],
      },
      {
        nome: "Salão de jogos",
        campos: [
          { name: "sj_piso", label: "Piso", options: ["Porcelanato"] },
          { name: "sj_parede", label: "Parede", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
          { name: "sj_teto", label: "Teto", options: ["Forro de gesso."] },
          { name: "sj_rodape", label: "Rodapé", options: ["Porcelanato, h=5 cm."] },
          { name: "sj_soleira", label: "Soleira", options: ["Mármore ou granito."] },
          { name: "sj_peitoril", label: "Peitoril", options: ["Metálico ou granito."] },
          { name: "sj_esquadria", label: "Esquadria", options: ["Alumínio pintado de branco."] },
          { name: "sj_vidro", label: "Vidro", options: ["Liso incolor."] },
          { name: "sj_inst_eletricas", label: "Inst. Elétricas", options: ["Ponto de luz no teto com luminária, tomada de corrente e interruptor na cor branco."] },
        ],
      },
      {
        nome: "Academia",
        campos: [
          { name: "acad_piso", label: "Piso", options: ["Vinílico."] },
          { name: "acad_parede", label: "Parede", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
          { name: "acad_teto", label: "Teto", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA ou Forro em gesso."] },
          { name: "acad_rodape", label: "Rodapé", options: ["Vinílico, mármore, granito ou madeira, h=5cm."] },
          { name: "acad_soleira", label: "Soleira", options: ["Mármore ou granito."] },
          { name: "acad_peitoril", label: "Peitoril", options: ["Metálico ou granito."] },
          { name: "acad_ferragens", label: "Ferragens", options: ["Acabamento cromado."] },
          { name: "acad_esquadria", label: "Esquadria", options: ["Alumínio pintado de branco."] },
          { name: "acad_vidro", label: "Vidro", options: ["Liso incolor."] },
          { name: "acad_inst_eletricas", label: "Inst. Elétricas", options: ["Ponto de luz no teto com luminária, tomada de corrente e interruptor na cor branco."] },
        ],
      },
      {
        nome: "Administração",
        campos: [
          { name: "adm_piso", label: "Piso", options: ["Cerâmica."] },
          { name: "adm_parede", label: "Parede", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
          { name: "adm_teto", label: "Teto", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
          { name: "adm_rodape", label: "Rodapé", options: ["Cerâmica, h=5 cm."] },
          { name: "adm_soleira", label: "Soleira", options: ["Mármore ou granito."] },
          { name: "adm_peitoril", label: "Peitoril", options: ["Metálico ou granito."] },
          { name: "adm_esquadria", label: "Esquadria", options: ["Alumínio pintado de branco."] },
          { name: "adm_vidro", label: "Vidro", options: ["Liso incolor."] },
          { name: "adm_inst_eletricas", label: "Inst. Elétricas", options: ["Ponto de luz no teto com luminária, tomada de corrente e interruptor na cor branco."] },
        ],
      },
      {
        nome: "Quadra Esportiva",
        campos: [
          { name: "qe_piso", label: "Piso", options: ["Concreto."] },
          { name: "qe_parede", label: "Parede", options: ["Fechamento em tela de nylon ou alambrado."] },
          { name: "qe_equip", label: "Equipamentos", options: ["A serem definidos."] },
        ],
      },
      {
        nome: "Quadra de Areia",
        campos: [
          { name: "qa_piso", label: "Piso", options: ["Areia."] },
          { name: "qa_parede", label: "Parede", options: ["Alambrado, rede de proteção em nylon ou mureta."] },
          { name: "qa_equip", label: "Equipamentos", options: ["A serem definidos."] },
        ],
      },
      {
        nome: "Piscina Adulto/ Infantil/ Deck",
        campos: [
          { name: "pis_pisc_piso", label: "Piso (Piscina)", options: ["Pastilha cerâmica."] },
          { name: "pis_pisc_parede", label: "Parede (Piscina)", options: ["Pastilha cerâmica."] },
          { name: "pis_deck", label: "Piso Deck", options: ["Porcelanato Incesa, Lef, Incefra, Portobello ou Cecafi, ou pedra natural."] },
          { name: "pis_borda", label: "Borda", options: ["Mármore ou granito."] },
          { name: "pis_equip", label: "Equipamentos", options: ["Bomba e filtro da Jacuzzi, Mark Peerles ou similar, e dispositivos em aço inox ou PVC."] },
        ],
      },
      {
        nome: "Gerador",
        campos: [
          { name: "ger_piso", label: "Piso", options: ["Cerâmica."] },
          { name: "ger_parede_interna", label: "Parede interna", options: ["Pintura PVA látex."] },
          { name: "ger_parede_externa", label: "Parede externa", options: ["Textura acrílica."] },
          { name: "ger_teto", label: "Teto", options: ["Pintura acrílica."] },
          { name: "ger_soleira", label: "Soleira", options: ["Mármore ou granito."] },
          { name: "ger_cobogo", label: "Cobogó", options: ["Em concreto."] },
          { name: "ger_portao", label: "Portão", options: ["Metálico pintado de branco."] },
          { name: "ger_inst_eletricas", label: "Inst. Elétricas", options: ["Ponto de luz no teto com luminária e interruptor na cor branco."] },
        ],
      },
      {
        nome: "Casa de lixo",
        campos: [
          { name: "cl_piso", label: "Piso", options: ["Cerâmica."] },
          { name: "cl_parede_interna", label: "Parede interna", options: ["Cerâmica."] },
          { name: "cl_parede_externa", label: "Parede externa", options: ["Textura acrílica."] },
          { name: "cl_teto", label: "Teto", options: ["Pintura PVA látex branco."] },
          { name: "cl_soleira", label: "Soleira", options: ["Mármore ou granito."] },
          { name: "cl_portao", label: "Portão", options: ["Metálico pintado de branco."] },
          { name: "cl_inst_eletricas", label: "Inst. Elétricas", options: ["Ponto de luz no teto com luminária, tomada de corrente e interruptor na cor branco."] },
          { name: "cl_inst_hidraulico", label: "Inst. Hidráulico", options: ["Torneira em PVC rígido."] },
        ],
      },
      {
        nome: "Vestiário Feminino/ Masculino",
        campos: [
          { name: "vest_piso", label: "Piso", options: ["Cerâmica."] },
          { name: "vest_parede", label: "Parede", options: ["Cerâmica."] },
          { name: "vest_teto", label: "Teto", options: ["Forro de gesso."] },
          { name: "vest_soleira", label: "Soleira", options: ["Mármore ou granito."] },
          { name: "vest_porta", label: "Porta", options: ["Alumínio pintado de branco."] },
          { name: "vest_ferragens", label: "Ferragens", options: ["Com acabamento cromado."] },
          { name: "vest_inst_eletricas", label: "Inst. Elétricas", options: ["Ponto de luz no teto com luminária e interruptor na cor branco."] },
        ],
      },
      {
        nome: "Escadaria das torres",
        campos: [
          { name: "escad_piso", label: "Piso", options: ["Concreto desempolado."] },
          { name: "escad_parede", label: "Parede", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
          { name: "escad_teto", label: "Teto", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
        ],
      },
      {
        nome: "Depósito (DML)",
        campos: [
          { name: "dml_piso", label: "Piso", options: ["Cerâmica."] },
          { name: "dml_parede", label: "Parede", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
          { name: "dml_teto", label: "Teto", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
          { name: "dml_rodape", label: "Rodapé", options: ["Cerâmica, h=5cm."] },
          { name: "dml_porta", label: "Porta", options: ["Alumínio pintado de branco."] },
          { name: "dml_ferragens", label: "Ferragens", options: ["Com acabamento cromado."] },
          { name: "dml_inst_eletricas", label: "Inst. Elétricas", options: ["Ponto de luz no teto com luminária e interruptor na cor branco."] },
        ],
      },
      {
        nome: "Muro de fechamento do condomínio",
        campos: [
          { name: "muro_acab_int", label: "Acabamento Interno", options: ["Bloco cerâmico rebocado e pintado ou bloco de concreto aparente."] },
          { name: "muro_acab_ext", label: "Acabamento Externo", options: ["Bloco cerâmico rebocado e pintura ou bloco cerâmico com chapisco rústico ou bloco de concreto aparente."] },
        ],
      },
      {
        nome: "Hall’s do lazer e torres",
        campos: [
          { name: "hall_piso", label: "Piso", options: ["Porcelanato."] },
          { name: "hall_parede", label: "Parede", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA."] },
          { name: "hall_teto", label: "Teto", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA ou forro de gesso."] },
          { name: "hall_rodape", label: "Rodapé", options: ["Porcelanato, h=5cm."] },
          { name: "hall_inst_eletricas", label: "Inst. Elétricas", options: ["Ponto de luz no teto com luminária."] },
        ],
      },
      {
        nome: "Instalações Gerais",
        campos: [
          { name: "ig_rede_eletrica", label: "Rede elétrica", options: ["Rede aérea ou subterrânea."] },
          { name: "ig_rede_comunic", label: "Rede de comunicação", options: ["Rede subterrânea ou aérea com tubulação seca e shafts ao longo dos pavimentos."] },
          { name: "ig_iluminacao_ruas", label: "Iluminação das ruas", options: ["Braços com Lâmpadas instalados nos postes da concessionária de energia ou em postes exclusivos para iluminação."] },
          { name: "ig_drenagem", label: "Drenag./pluviais", options: ["Através de caixas com lançamento em rede existente."] },
          { name: "ig_esgoto", label: "Esgot. Sanitário", options: ["Rede interna lançando no sistema público de coleta de esgoto ou Estação de Tratamento de Esgoto de operação do condomínio."] },
          { name: "ig_rede_agua", label: "Rede de Água", options: ["Rede de água interligada ao sistema público de fornecimento de água tratada, alimentando reservatório inferior."] },
        ],
      },
      {
        nome: "Vias internas e estacionamentos das unidades",
        campos: [
          { name: "vias_pavimentacao", label: "Pavimentação", options: ["Piso intertravado de concreto ou paralelepípedo sobre colchão de areia."] },
        ],
      },
      {
        nome: "Jardins",
        campos: [
          { name: "jardins_descr", label: "Jardins", options: ["Grama e alguns arbustos em locais definidos no projeto."] },
        ],
      },
      {
        nome: "Passeio externo",
        campos: [
          { name: "passeio_descr", label: "Passeio", options: ["Em concreto com junta seca."] },
        ],
      },
      {
        nome: "Portão de veículos (externo)",
        campos: [
          { name: "portao_descr", label: "Portão", options: ["Metálico pintado de branco."] },
          { name: "portao_inst_eletrica", label: "Inst. Elétrica", options: ["Fechadura elétrica no portão para pedestres, e motor para acionamento do portão para veículos."] },
        ],
      },
    ],
  },
];

// -------------------- Componente principal --------------------
export default function CadastroImovel() {
  const { control, handleSubmit, getValues } = useForm({ mode: "onSubmit" });

  // Gera o documento Word (.docx) com título e seções
  const gerarWord = async (dados: any) => {
    const children: Paragraph[] = [];

    // Título principal
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "MEMORIAL DESCRITIVO DO IMÓVEL",
            bold: true,
            size: 28,
          }),
        ],
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
      })
    );

    // Para cada seção e subtítulo, adiciona parágrafos
    secoes.forEach((secao) => {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: secao.titulo, bold: true, size: 26 })],
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 200 },
        })
      );

      secao.subtitulos.forEach((sub) => {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: sub.nome, bold: true, size: 24 })],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 100, after: 100 },
          })
        );

        sub.campos.forEach((campo) => {
          const valor = dados[campo.name] ? String(dados[campo.name]) : "Não especificado";
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: `${campo.label}: `, bold: true }),
                new TextRun({ text: valor }),
              ],
              spacing: { after: 100 },
            })
          );
        });
      });
    });

    const doc = new Document({
      sections: [{ children }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "Memorial_Descritivo_Imovel.docx");
  };

  const onSubmit = (data: any) => {
    gerarWord(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-10 border border-gray-100"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src="/imagens/logo.png" alt="Logo" width={160} height={160} className="object-contain" />
        </div>

        <h1 className="text-4xl font-extrabold text-center text-red-700 mb-4 tracking-tight">Cadastro de Obra</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {secoes.map((secao) => (
            <div key={secao.titulo}>
              <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4 border-b pb-2">{secao.titulo}</h2>

              {secao.subtitulos.map((sub) => (
                <div key={sub.nome} className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">{sub.nome}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {sub.campos.map(({ name, label, options }) => (
                      <div key={name} className="bg-gray-50 border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition">
                        <Controller
                          name={name}
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <>
                              <label className="block text-lg text-gray-800 font-semibold mb-2">{label}</label>
                              <select
                                {...field}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                              >
                                <option value="">Selecione uma opção</option>
                                {options.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            </>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white text-xl font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-200"
            >
              Salvar Formulário em Word
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
