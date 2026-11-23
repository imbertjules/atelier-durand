export type KnowledgeDocument = {
  id: string;
  title: string;
  summary: string;
  updated: string;
  filename: string;
  markdown: string;
};

export type Chunk = {
  id: string;
  documentId: string;
  title: string;
  heading: string;
  anchor: string;
  text: string;
};

export type ScoredChunk = {
  chunk: Chunk;
  score: number;
  hits: number;
};

export type Retrieval = {
  covered: boolean;
  chunks: Chunk[];
  scored: ScoredChunk[];
};

export type SourceRef = {
  documentId: string;
  title: string;
  heading: string;
  anchor: string;
  chunkId: string;
};

export type AnswerMode = "gateway" | "extractif" | "refus";

export type AnswerMeta = {
  mode: AnswerMode;
  sources: SourceRef[];
};
