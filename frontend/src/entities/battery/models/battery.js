export default class Battery {
  constructor(data) {
    this.id = data.id
    this.percents = data.percents
    this.userId = data.userId
    this.donorId = data.donorId
    this.recipientId = data.recipientId
  }
}
