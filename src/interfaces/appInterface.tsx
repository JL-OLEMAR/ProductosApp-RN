// Generated by https://quicktype.io

export interface LoginData {
  correo: string
  password: string
}
export interface LoginResponse {
  usuario: Usuario
  token: string
}

export interface Usuario {
  rol: string
  estado: boolean
  google: boolean
  nombre: string
  correo: string
  uid: string
  img?: string
}
