import Controller from '@ember/controller';
import { action, computed } from '@ember/object';

export default class extends Controller {

  @computed('model.rooms.data')
  get rooms() {
    return this.model.rooms?.data;
  }

  @action
  async changeRoomChatStatus(room) {
    room.isChatEnabled = !room.isChatEnabled;
    if (room.isGlobalEventRoom) {
      room.isGlobalEventRoom = !room.isGlobalEventRoom;
    }
    await room.save();
  }

  @action
  async setGlobalEventRoom(room) {
    room.isGlobalEventRoom = !room.isGlobalEventRoom;
    if (room.isChatEnabled) {
      room.isChatEnabled = !room.isChatEnabled;
    }
    await room.save();
  }

  @action
  async toggleChat() {
    const { event } = this.model;
    this.set('model.event.isChatEnabled', !event.isChatEnabled);
    try {
      await event.save();
    } catch (error) {
      console.error('Error while enabling chat', error);
    }
  }
}
