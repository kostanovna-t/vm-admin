import {
    AlertDTO,
    AlertTypeDTO,
    APIResponseDTO,
    VMCreateRequestDTO,
    VMResponseDTO,
} from '../dto';

import {
    Alert,
    AlertType,
    VM,
    VMCreateData,
    VMState,
} from '../domain';

export const mapAlertDTOToDomain = (dto: AlertDTO): Alert => {
  const alert: Alert = {
    type: dto.type as AlertType,
  };
  if (dto.count !== undefined) {
    alert.count = dto.count;
  }
  return alert;
};

export const mapAlertDomainToDTO = (domain: Alert): AlertDTO => {
  const dto: AlertDTO = {
    type: domain.type as AlertTypeDTO,
  };
  if (domain.count !== undefined) {
    dto.count = domain.count;
  }
  return dto;
};

export const mapVMResponseToDomain = (dto: VMResponseDTO): VM => ({
  id: dto.id,
  state: dto.state as VMState,
  server: dto.server,
  cpu: dto.cpu,
  memory: dto.memory,
  uptime: dto.uptime,
  alerts: dto.alerts.map(mapAlertDTOToDomain),
});

export const mapVMDomainToCreateRequest = (domain: VMCreateData): VMCreateRequestDTO => ({
  server: domain.server,
  cpu: domain.cpu,
  memory: domain.memory,
});

export const mapVMResponseArrayToDomain = (dtos: VMResponseDTO[]): VM[] =>
  dtos.map(mapVMResponseToDomain);

export const mapAlertResponseArrayToDomain = (dtos: AlertDTO[]): Alert[] =>
  dtos.map(mapAlertDTOToDomain);

export const mapAPIResponseToDomain = <T, U>(
  response: APIResponseDTO<T>,
  dataMapper: (data: T) => U
): U => {
  if (!response.success) {
    throw new Error(response.error || 'API request failed');
  }
  return dataMapper(response.data);
};
