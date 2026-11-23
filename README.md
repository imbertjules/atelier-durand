# Atelier Durand — assistant documentaire

Démo de l’offre **Assistant IA sur vos documents**, pour Jules Imbert, intégrateur IA pour PME. L’entreprise, les tarifs et les procédures sont fictifs : un bureau d’études thermique lyonnais, Atelier Durand, dont l’assistant ne répond qu’à partir de huit notes internes.

Chaque réponse cite le document source. Si la question sort de la base, l’assistant le dit.

## Lancer

```bash
npm install
npm run dev
```

L’application écoute sur [http://127.0.0.1:43123](http://127.0.0.1:43123).

```bash
npm test
npm run lint
npm run build
```

## Passerelle IA et mode secours

La génération et les embeddings passent par le Vercel AI SDK et l’AI Gateway (`openai/gpt-4.1-mini`, repli `mistral/mistral-small`, embeddings `openai/text-embedding-3-small`).

Sur Vercel, le jeton OIDC est utilisé sans configuration. En local, on peut poser `AI_GATEWAY_API_KEY` (voir `.env.example`). Sans clé, ou si la passerelle échoue, la démo reste utilisable : recherche par mots-clés et réponse extraite du meilleur passage, avec le bandeau « Extrait documentaire — sans modèle de langage ».

Les questions sont limitées à 500 caractères, avec un plafond par adresse IP.

## Texte pour une carte Malt

Assistant IA sur vos documents : démo pour une PME fictive, un bureau d’études thermique. Le chat ne répond qu’à partir des notes internes, cite sa source, et le dit quand l’information n’y figure pas. Passerelle Vercel AI, mode secours sans clé.
