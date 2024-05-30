'use server'

export interface UserLocation {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

export async function userLocation(): Promise<UserLocation> {
  // const response = await fetch('http://ip-api.com/json');

  // const location = await response.json() as UserLocation;

  var iran = {
    "status": "success",
    "country": "Iran",
    "countryCode": "IR",
    "region": "10",
    "regionName": "Isfahan",
    "city": "Khomeynī Shahr",
    "zip": "",
    "lat": 32.6856, // 48.210033, 16.363449 
    "lon": 51.5361,
    "timezone": "Asia/Tehran",
    "isp": "Aria Shatel Company Ltd",
    "org": "",
    "as": "AS31549 Aria Shatel Company Ltd",
    "query": "151.244.174.87"
  }

  var austria = {
    "country": "austria",
    "lat": 48.210033,
    "lon": 16.363449,
  } as any

  return austria;
}
