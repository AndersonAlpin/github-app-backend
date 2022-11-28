import { Injectable } from '@nestjs/common';
import { Octokit } from 'octokit';

@Injectable()
export class UserService {
  async findAll(since: number, auth: string) {
    try {
      const octokit = new Octokit({ auth });
      return await octokit.request('GET /users?since={since}', {
        since,
      });
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  async findOne(username: string, auth: string) {
    try {
      const octokit = new Octokit({ auth });
      return await octokit.request('GET /users/{username}', {
        username,
      });
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  async findRepos(username: string, auth: string) {
    try {
      const octokit = new Octokit({ auth });
      return await octokit.request('GET /users/{username}/repos', {
        username,
      });
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
}
