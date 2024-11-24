import { instance } from '@/common/api'
import {
  ProfileDevicesEndpoints,
  Sessions,
} from '@/features/profile/settings/devices'
import { AxiosInstance, AxiosResponse } from 'axios'

class ProfileDevicesApi {
  constructor(private instance: AxiosInstance) {}
  public deleteSession(deviceId: number): Promise<AxiosResponse> {
    return this.instance.delete(
      `${ProfileDevicesEndpoints.sessions}/${deviceId}`
    )
  }
  public async getSessions(): Promise<Sessions> {
    const res = await this.instance.get(ProfileDevicesEndpoints.sessions)

    return res.data
  }
  public terminateAllSessions(): Promise<AxiosResponse> {
    return this.instance.delete(ProfileDevicesEndpoints.terminateAllSessions)
  }
}

export const profileDevicesApi = new ProfileDevicesApi(instance)
