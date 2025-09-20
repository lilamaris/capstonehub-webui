import { CollegeId, MajorId } from '../domain/schema'
import { httpClient } from './client'
import { CreateCollegeRequest, CreateMajorRequest, UpdateCollegeRequest, UpdateMajorRequest } from './requestType'

const createCollege = (request: CreateCollegeRequest) => {
  const uri = 'college'
  return httpClient.request({ method: 'POST', url: uri, data: request })
}

const updateCollege = (id: CollegeId, request: UpdateCollegeRequest) => {
  const uri = `college/${id}`
  return httpClient.request({ method: 'PUT', url: uri, data: request })
}

const createMajor = (request: CreateMajorRequest) => {
  const uri = 'major'
  return httpClient.request({ method: 'POST', url: uri, data: request })
}

const updateMajor = (id: MajorId, request: UpdateMajorRequest) => {
  const uri = `major/${id}`
  return httpClient.request({ method: 'PUT', url: uri, data: request })
}
