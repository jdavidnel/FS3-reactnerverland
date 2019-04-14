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
import * as crypto from "crypto";

const mongo = require('../connection');
const jwt = require('jsonwebtoken');
const secretKey = "secretKey";

export class MiddlewaresGraphQL {

  public _playerRepo: PlayerRepository;
  public _memeRepo: MemeRepository;
  public _voteRepo: VoteRepository;
  public _clashRepo: ClashRepository;
  public _roundRepo: RoundRepository;
  public _resolvers: any;
  public _typeDefs: any;
  public _io: any;
  public _token: string;

  get typeDefs(): any {
    return this._typeDefs;
  }

  get resolvers(): any {
    return this._resolvers;
  }

  constructor() {
    this._token = "TestToken";
    require('crypto').randomBytes(48, (err: any, buffer: any) => {
      this._token = buffer.toString('hex');
    });
    this._playerRepo = new PlayerRepository();
    this._memeRepo = new MemeRepository(this._playerRepo);
    this._roundRepo = new RoundRepository(this._memeRepo);
    this._voteRepo = new VoteRepository(this._playerRepo, this._memeRepo, this._roundRepo);
    this._clashRepo = new ClashRepository(this._playerRepo, this._roundRepo);
    this._typeDefs = readFileSync(__dirname + '/schemas.graphql', 'utf8');
    this._resolvers = {
      // Prototypes des fonctions GET
      Query: {
        players: async (_: any, filters: any) => {
          var list: IPlayer[] = await this._playerRepo.getPlayers(filters);
          console.log("Return player ");
          return list;
        },
        clashs: async (_: any, filters: any) => {
          var list: IClash[] = await this._clashRepo.get(filters);
          console.log("Return Clash ");
          return list;
        },
        votes: async (_: any, filters: any) => {
          var list: IVote[] = await this._voteRepo.get(filters);
          console.log("Return votes ");
          return list;
        },
        memes: async (_: any, filters: any) => {
          var list: IMeme[] = await this._memeRepo.get(filters);
          console.log("Return meme ");
          return list;
        },
        rounds: async (_: any, filters: any) => {
          var list: IRound[] = await this._roundRepo.get(filters);
          console.log("Return round ");
          return list;
        },
        authentification: async (_: any, filters: any) => {
          console.log(_);
          let result: IPlayer[] = await this._playerRepo.get(filters);

          if (result.length == 0)
            return null;
          const payload = {
            admin: result[0]._id
          };
          var token = jwt.sign(payload, secretKey, {
            expiresInMinutes: 600 // expires in 24 hours
          });
          /*const payload = {
            admin: result[0].login
          };
          var token = jwt.sign(payload, this._token, {
            expiresInMinutes: 1440 // expires in 24 hours
          });*/
          return token;
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

          let clashAdded: any = await this._clashRepo.addClash(clash);

          let clashWorks: IClash[] = await this._clashRepo.get({ inprogress: true });
          console.log("IO IS NULL ?");
          if (this._io != undefined || this._io != null) {
            console.log("emit SOCKET from " + this._io.userid);
            this._io.broadcast.emit('GetClashList', clashWorks);
          }
          /*console.log(this._io);
          this._io.on('connection', (socket: any) => {
            console.log("add CLASH!!");
            
          });*/
          return clashAdded;
        },
        updateClash: async (_: any, clash: any) => {
          //const newClash = await clashRepository.updateClash(clash);

          return await this._clashRepo.updateClash(clash);
        },
        deleteClash: async (_: any, clashId: string) => {
          //const deletedClash = await clashRepository.deleteClash(clashId);

          return await this._clashRepo.deleteClash(clashId);
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
          return await this._memeRepo.findById(round.f_meme);
        },
        nd_meme: async (round: any) => {
          /*const memes = await Promise.all(round.meme.map(async (memeID: any) => {
            const meme = await (new MemeRepository()).getMeme({ _id: memeID });
            return meme[0];
          }));*/
          return await this._memeRepo.findById(round.nd_meme);
        },
        vote: async (round: any) => {
          const votes = await Promise.all(round.vote.map(async (voteID: any) => {
            return await this._voteRepo.findById(voteID);
          }));
          return votes;
        },
        winner: async (round: any) => {
          return await this._playerRepo.findById(round.winner);
        },
      },

      Clash: {
        f_competitors: async (clash: any) => {
          return await this._playerRepo.findById(clash.f_competitors);
        },
        nd_competitors: async (clash: any) => {
          return await this._playerRepo.findById(clash.nd_competitors);
        },
        suscribers: async (clash: any) => {
          const players = await Promise.all(clash.suscribers.map(async (playerID: any) => {
            return await this._playerRepo.findById(playerID);
          }));
          return players;
        },
        round: async (clash: any) => {
          const rounds = await Promise.all(clash.round.map(async (roundID: any) => {
            return await this._roundRepo.findById(roundID);
          }));
          return rounds;
        },
        winner: async (round: any) => {
          return await this._playerRepo.findById(round.winner);
        },
      },
      Vote: {
        user: async (vote: any) => {
          return await this._playerRepo.findById(vote.user);
        },
        for: async (vote: any) => {
          return await this._memeRepo.findById(vote.for);
        },
      },
      Meme: {
        player: async (meme: any) => {
          return await this._playerRepo.findById(meme.player);
        },
      },
    };

  }

}







console.log("SCHEMA MIDDLEWARE!!");
console.log("SCHEMA MIDDLEWARE FIN!!");