import { API_CLIENT } from './index';

export class FilesApi {
  static uploadFile = (file: File, type: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return API_CLIENT.post(`/api/files`, formData);
  };
}
