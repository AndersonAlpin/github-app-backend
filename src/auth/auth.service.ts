import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as qs from 'query-string';
import { Octokit } from 'octokit';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  async authenticate(code: string) {
    try {
      const token = await this.getGitHubToken(code);
      const { avatar_url, name } = await this.getUser(token);
      return { token, avatar_url, name };
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  async getGitHubToken(code: any) {
    const ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';

    const body = {
      code: code.code,
      grant_type: 'authorization_code',
      redirect_uri: this.configService.get('GITHUB_REDIRECT_URL'),
      client_id: this.configService.get('GITHUB_CLIENT_ID'),
      client_secret: this.configService.get('GITHUB_CLIENT_SECRET'),
    };

    const { data } = await axios.post(ACCESS_TOKEN_URL, body);

    const { access_token } = qs.parse(data);
    return access_token as string;
  }

  async getUser(token: string) {
    const octokit = new Octokit({ auth: token });
    const { data } = await octokit.request('GET /user');
    return data;
  }
}
