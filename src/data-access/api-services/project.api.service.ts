import { ProjectMapper } from '../mapping/project.mapper';
import { responseHandler } from '../services/response.handler';


class ProjectApiService {
    cors = 'https://cors-anywhere.herokuapp.com/';
    baseUrl = 'https://planner5d.com/api/project/';

    getProjectList(id: string): Promise<any> {
        return fetch(`${this.cors + this.baseUrl}${id}`)
            .then(responseHandler)
            .then((response: Response) => response.json())
            .then(projectInfo => ProjectMapper.fromJson(projectInfo))
            .catch((err) => { throw new Error('Server error'); });
    }
}

export const projectApiService = new ProjectApiService();