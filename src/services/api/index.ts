import {
    APIResponseDTO,
    VMResponseDTO,
} from '../../types/dto';

import {
    VM,
    VMCreateData,
} from '../../types/domain';

import {
    mapAPIResponseToDomain,
    mapVMDomainToCreateRequest,
    mapVMResponseArrayToDomain,
    mapVMResponseToDomain,
} from '../../types/mappers';

const API_BASE_URL = import.meta.env['VITE_API_URL'] || 'http://localhost:3000/api';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Get all virtual machines
  async getVMs(): Promise<VM[]> {
    const response = await this.request<VMResponseDTO[]>('/vms');
    return mapVMResponseArrayToDomain(response);
  }

  // Create a new virtual machine
  async createVM(data: VMCreateData): Promise<VM> {
    const dto = mapVMDomainToCreateRequest(data);
    const response = await this.request<APIResponseDTO<VMResponseDTO>>('/vms', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
    return mapAPIResponseToDomain(response, mapVMResponseToDomain);
  }
}

export const apiService = new ApiService();
