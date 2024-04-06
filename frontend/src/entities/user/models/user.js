export default class User {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.role = data.role
  }

  get isAdmin() {
    return this.role === 'ADMIN'
  }
}
