export interface HTTPResponse<T> {
  data: T
  status: number
  statusText: string
}

export interface HTTPErrorResponse {
  message: string
  status: number
  errors?: Map<string, string>
}

export interface Page<T> {
  page: number
  size: number
  totalElement: number
  totalPage: number
  data: T[]
}
