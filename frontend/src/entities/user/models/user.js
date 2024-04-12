export default class User {
  constructor(data) {
    this.id = data.id
    this.login = data.login
    this.role = data.role
    this.batteryIds = data.batteryIds || []
  }

  get isAdmin() {
    return this.role === 'ADMIN'
  }
}
