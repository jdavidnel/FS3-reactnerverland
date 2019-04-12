/*
const { readFileSync } = require('fs');
const { makeExecutableSchema } = require('graphql-tools');

const queries = require('../queries/queries');
const clashRepository = require('../queries/ClashRepository');
const voteRepository = require('../queries/VoteRepository');
const memeRepository = require('../queries/MemeRepository');
const roundRepository = require('../queries/RoundRepository');
const playerRepository = require('../queries/PlayerRepository');
*/
const { readFileSync } = require('fs');
const { makeExecutableSchema } = require('graphql-tools');
import { PlayerRepository } from '../queries/PlayerRepository';
import { MemeRepository } from '../queries/MemeRepository';
import { VoteRepository } from '../queries/VoteRepository';
import { ClashRepository } from '../queries/ClashRepository';
import { RoundRepository } from '../queries/RoundRepository';
import { IPlayer } from '../../../types/Model/PlayerModel';
import { IClash } from '../../../types/Model/ClashModel';


const mongo = require('../connection');
//const playerRepository = require('../queries/PlayerRepository');
console.log(__dirname);
const typeDefs = readFileSync(__dirname + '/schemas.graphql', 'utf8');
const resolvers = {
  // Prototypes des fonctions GET
  Query: {
    players: async (_: any, filters: any) => {
      var list: IPlayer[] = await (new PlayerRepository()).getPlayers(filters);
      console.log("NOUVELLE LIST ");
      return list[0];
    },
    clashs: (_: any, filters: any) => {
      var list: IClash[] = await(new ClashRepository()).getClash(filters);
      console.log("NOUVELLE LIST ");
      return list[0];
    },
    votes: (_: any, filters: any) => { return (new VoteRepository()).getVote(filters); },
    memes: (_: any, filters: any) => { return (new MemeRepository()).getMeme(filters); },
    rounds: (_: any, filters: any) => { return (new RoundRepository()).getRound(filters); },
  },
  // Prototypes des fonctions POST, UPDATE, DELETE
  Mutation: {
    addPlayer: async (_: any, player: any) => {
      const newPlayer = await (new PlayerRepository()).addPlayer(player);
      return newPlayer;
    },
    updatePlayer: async (_: any, player: any) => {
      const newPlayer = await (new PlayerRepository()).updatePlayer(player);
      return newPlayer;
    },
    deletePlayer: async (_: any, playerId: any) => {
      const deletedPlayer = await (new PlayerRepository()).deletePlayer(playerId);

      return null;
    },

    addClash: async (_: any, clash: any) => {
      //const newClash = await clashRepository.addClash(clash);

      return null;
    },
    updateClash: async (_: any, clash: any) => {
      //const newClash = await clashRepository.updateClash(clash);

      return null;
    },
    deleteClash: async (_: any, clashId: any) => {
      //const deletedClash = await clashRepository.deleteClash(clashId);

      return null;
    },

    addVote: async (_: any, clash: any) => {
      //const newClash = await clashRepository.addClash(clash);

      return null;
    },
    updateVote: async (_: any, clash: any) => {
      //const newClash = await clashRepository.updateClash(clash);

      return null;
    },
    deleteVote: async (_: any, clashId: any) => {
      //const deletedClash = await clashRepository.deleteClash(clashId);

      return null;
    },

    addMeme: async (_: any, clash: any) => {
      //const newClash = await clashRepository.addClash(clash);

      return null;
    },
    updateMeme: async (_: any, clash: any) => {
      //const newClash = await clashRepository.updateClash(clash);

      return null;
    },
    deleteMeme: async (_: any, clashId: any) => {
      //const deletedClash = await clashRepository.deleteClash(clashId);

      return null;
    },


    addRound: async (_: any, clash: any) => {
      //const newClash = await clashRepository.addClash(clash);

      return null;
    },
    updateRound: async (_: any, clash: any) => {
      //const newClash = await clashRepository.updateClash(clash);

      return null;
    },
    deleteRound: async (_: any, clashId: any) => {
      //const deletedClash = await clashRepository.deleteClash(clashId);

      return null;
    },
  },
  Round: {
    meme: async (round: any) => {
      const memes = await Promise.all(round.meme.map(async (memeID: any) => {
        const meme = await (new MemeRepository()).getMeme({ _id: memeID });
        return meme[0];
      }));
      return memes;
    },
    vote: async (round: any) => {
      const votes = await Promise.all(round.vote.map(async (voteID: any) => {
        const vote = await (new VoteRepository()).getVote({ _id: voteID });
        return vote[0];
      }));
      return votes;
    },
    winner: async (round: any) => {
      const player = await (new PlayerRepository()).getPlayers({ _id: round.winner });
      return player[0];
    },
  },

  Clash: {
    competitors: async (clash: any) => {
      const players = await Promise.all(clash.competitors.map(async (playerID: any) => {
        const player = await (new PlayerRepository()).getPlayers({ _id: playerID });
        return player[0];
      }));
      console.log("Competitors get from clash !");
      return players;
    },
    suscribers: async (clash: any) => {
      const players = await Promise.all(clash.suscribers.map(async (playerID: any) => {
        const player = await (new PlayerRepository()).getPlayers({ _id: playerID });
        return player[0];
      }));
      return players;
    },
    round: async (clash: any) => {
      const rounds = await Promise.all(clash.round.map(async (roundID: any) => {
        const round = await (new RoundRepository()).getRound({ _id: roundID });
        return round[0];
      }));
      return rounds;
    },
    winner: async (round: any) => {
      const player = await (new PlayerRepository()).getPlayers({ _id: round.winner });
      return player[0];
    },
  },
  Vote: {
    user: async (vote: any) => {
      const player = await (new PlayerRepository()).getPlayers({ _id: vote.user });
      return player[0];
    },
    for: async (vote: any) => {
      const meme = await (new MemeRepository()).getMeme({ _id: vote.for });
      return meme[0];
    },
  },

  Meme: {
    player: async (meme: any) => {
      const player = await (new PlayerRepository()).getPlayers({ _id: meme.player });
      return player[0];
    },
  },
};

const schema = {
  typeDefs: readFileSync(__dirname + '/schemas.graphql', 'utf8'),
  resolvers: {
    // Prototypes des fonctions GET
    Query: {
      players: (_: any, filters: any) => {
        return (new PlayerRepository()).getPlayers(filters).then((data: IPlayer[]) => {
          console.log("Middleware async");
          return data;
        });
      },
      clashs: (_: any, filters: any) => { return (new ClashRepository()).getClash(filters); },
      votes: (_: any, filters: any) => { return (new VoteRepository()).getVote(filters); },
      memes: (_: any, filters: any) => { return (new MemeRepository()).getMeme(filters); },
      rounds: (_: any, filters: any) => { return (new RoundRepository()).getRound(filters); },
    },
    // Prototypes des fonctions POST, UPDATE, DELETE
    Mutation: {
      addPlayer: async (_: any, player: any) => {
        const newPlayer = await (new PlayerRepository()).addPlayer(player);
        return newPlayer;
      },
      updatePlayer: async (_: any, player: any) => {
        const newPlayer = await (new PlayerRepository()).updatePlayer(player);
        return newPlayer;
      },
      deletePlayer: async (_: any, playerId: any) => {
        const deletedPlayer = await (new PlayerRepository()).deletePlayer(playerId);

        return null;
      },

      addClash: async (_: any, clash: any) => {
        //const newClash = await clashRepository.addClash(clash);

        return null;
      },
      updateClash: async (_: any, clash: any) => {
        //const newClash = await clashRepository.updateClash(clash);

        return null;
      },
      deleteClash: async (_: any, clashId: any) => {
        //const deletedClash = await clashRepository.deleteClash(clashId);

        return null;
      },

      addVote: async (_: any, clash: any) => {
        //const newClash = await clashRepository.addClash(clash);

        return null;
      },
      updateVote: async (_: any, clash: any) => {
        //const newClash = await clashRepository.updateClash(clash);

        return null;
      },
      deleteVote: async (_: any, clashId: any) => {
        //const deletedClash = await clashRepository.deleteClash(clashId);

        return null;
      },

      addMeme: async (_: any, clash: any) => {
        //const newClash = await clashRepository.addClash(clash);

        return null;
      },
      updateMeme: async (_: any, clash: any) => {
        //const newClash = await clashRepository.updateClash(clash);

        return null;
      },
      deleteMeme: async (_: any, clashId: any) => {
        //const deletedClash = await clashRepository.deleteClash(clashId);

        return null;
      },


      addRound: async (_: any, clash: any) => {
        //const newClash = await clashRepository.addClash(clash);

        return null;
      },
      updateRound: async (_: any, clash: any) => {
        //const newClash = await clashRepository.updateClash(clash);

        return null;
      },
      deleteRound: async (_: any, clashId: any) => {
        //const deletedClash = await clashRepository.deleteClash(clashId);

        return null;
      },
    },
    Round: {
      meme: async (round: any) => {
        const memes = await Promise.all(round.meme.map(async (memeID: any) => {
          const meme = await (new MemeRepository()).getMeme({ _id: memeID });
          return meme[0];
        }));
        return memes;
      },
      vote: async (round: any) => {
        const votes = await Promise.all(round.vote.map(async (voteID: any) => {
          const vote = await (new VoteRepository()).getVote({ _id: voteID });
          return vote[0];
        }));
        return votes;
      },
      winner: async (round: any) => {
        const player = await (new PlayerRepository()).getPlayers({ _id: round.winner });
        return player[0];
      },
    },

    Clash: {
      competitors: async (clash: any) => {
        const players = await Promise.all(clash.competitors.map(async (playerID: any) => {
          const player = await (new PlayerRepository()).getPlayers({ _id: playerID });
          return player[0];
        }));
        console.log("Competitors get from clash !");
        return players;
      },
      suscribers: async (clash: any) => {
        const players = await Promise.all(clash.suscribers.map(async (playerID: any) => {
          const player = await (new PlayerRepository()).getPlayers({ _id: playerID });
          return player[0];
        }));
        return players;
      },
      round: async (clash: any) => {
        const rounds = await Promise.all(clash.round.map(async (roundID: any) => {
          const round = await (new RoundRepository()).getRound({ _id: roundID });
          return round[0];
        }));
        return rounds;
      },
      winner: async (round: any) => {
        const player = await (new PlayerRepository()).getPlayers({ _id: round.winner });
        return player[0];
      },
    },
    Vote: {
      user: async (vote: any) => {
        const player = await (new PlayerRepository()).getPlayers({ _id: vote.user });
        return player[0];
      },
      for: async (vote: any) => {
        const meme = await (new MemeRepository()).getMeme({ _id: vote.for });
        return meme[0];
      },
    },

    Meme: {
      player: async (meme: any) => {
        const player = await (new PlayerRepository()).getPlayers({ _id: meme.player });
        return player[0];
      },
    },
  },
};

console.log("SCHEMA MIDDLEWARE!!");
console.log(schema.typeDefs);
console.log("SCHEMA MIDDLEWARE FIN!!");
export {
  typeDefs,
  resolvers
};