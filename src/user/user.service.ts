import { Injectable } from '@nestjs/common';
import { Octokit } from 'octokit';

@Injectable()
export class UserService {
  async findAll(token: string, page: number) {
    try {
      const octokit = new Octokit({ auth: token });
      return await octokit.request('GET /users?since={page}', {
        page,
      });
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  async findOne(name: string, token: string) {
    try {
      const octokit = new Octokit({ auth: token });
      return await octokit.request('GET /users/{username}', {
        username: name,
      });
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  async findRepos(name: string, token: string) {
    try {
      const octokit = new Octokit({ auth: token });
      return await octokit.request('GET /users/{username}/repos', {
        username: name,
      });
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
}
