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
import { IRound } from '../../../types/Model/RoundModel';
import { IVote } from '../../../types/Model/VoteModel';
import { IMeme } from '../../../types/Model/MemeModel';

const mongo = require('../connection');

export class MiddlewaresGraphQL {

  private _playerRepo: PlayerRepository;
  private _memeRepo: MemeRepository;
  private _voteRepo: VoteRepository;
  private _clashRepo: ClashRepository;
  private _roundRepo: RoundRepository;
  public _resolvers: any;
  public _typeDefs: any;

  get typeDefs(): any {
    return this._typeDefs;
  }

  get resolvers(): any {
    return this._resolvers;
  }

  constructor() {
    this._playerRepo = new PlayerRepository();
    this._memeRepo = new MemeRepository();
    this._voteRepo = new VoteRepository();
    this._clashRepo = new ClashRepository();
    this._roundRepo = new RoundRepository();
    this._typeDefs = readFileSync(__dirname + '/schemas.graphql', 'utf8');
    this._resolvers = {
      // Prototypes des fonctions GET
      Query: {
        players: async (_: any, filters: any) => {
          var list: IPlayer[] = await this._playerRepo.getPlayers(filters);
          console.log("Return player ");
          return list[0];
        },
        clashs: async (_: any, filters: any) => {
          var list: IClash[] = await this._clashRepo.getClash(filters);
          console.log("Return Clash ");
          return list[0];
        },
        votes: async (_: any, filters: any) => {
          var list: IVote[] = await this._voteRepo.getVote(filters);
          console.log("Return votes ");
          return list[0];
        },
        memes: async (_: any, filters: any) => {
          var list: IMeme[] = await this._memeRepo.getMeme(filters);
          console.log("Return meme ");
          return list[0];
        },
        rounds: async (_: any, filters: any) => {
          var list: IRound[] = await this._roundRepo.getRound(filters);
          console.log("Return round ");
          return list[0];
        },
      },
      // Prototypes des fonctions POST, UPDATE, DELETE
      Mutation: {
        addPlayer: async (_: any, player: any) => {
          return await this._playerRepo.addPlayer(player);
        },
        updatePlayer: async (_: any, player: any) => {
          const newPlayer = await this._playerRepo.updatePlayer(player);
          return newPlayer;
        },
        deletePlayer: async (_: any, playerId: any) => {
          const deletedPlayer = await this._playerRepo.deletePlayer(playerId);

          return null;
        },

        addClash: async (_: any, clash: any) => {

          return await this._clashRepo.addClash(clash);
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

          return;
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
        f_meme: async (round: any) => {
          /*const memes = await Promise.all(round.meme.map(async (memeID: any) => {
            const meme = await (new MemeRepository()).getMeme({ _id: memeID });
            return meme[0];
          }));*/
          return await (new MemeRepository()).findById(round.f_meme);
        },
        nd_meme: async (round: any) => {
          /*const memes = await Promise.all(round.meme.map(async (memeID: any) => {
            const meme = await (new MemeRepository()).getMeme({ _id: memeID });
            return meme[0];
          }));*/
          return await (new MemeRepository()).findById(round.nd_meme);
        },
        vote: async (round: any) => {
          const votes = await Promise.all(round.vote.map(async (voteID: any) => {
            const vote = await (new VoteRepository()).getVote({ _id: voteID });
            return vote[0];
          }));
          return votes;
        },
        winner: async (round: any) => {
          return await (new PlayerRepository()).findById(round.winner);
        },
      },

      Clash: {
        f_competitors: async (clash: any) => {
          return await (new PlayerRepository()).findById(clash.f_competitors);
        },
        nd_competitors: async (clash: any) => {
          return await (new PlayerRepository()).findById(clash.nd_competitors);
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
          return await (new PlayerRepository()).findById(round.winner);
        },
      },
      Vote: {
        user: async (vote: any) => {
          return await (new PlayerRepository()).findById(vote.user);
        },
        for: async (vote: any) => {
          return await (new PlayerRepository()).findById(vote.for);
        },
      },

      Meme: {
        player: async (meme: any) => {
          const player = await (new PlayerRepository()).getPlayers({ _id: meme.player });
          return player[0];
        },
      },
    };

  }

}







console.log("SCHEMA MIDDLEWARE!!");
console.log("SCHEMA MIDDLEWARE FIN!!");