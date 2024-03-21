import Controller from '@ember/controller';
import { action, computed } from '@ember/object';

export default class extends Controller {

  @computed('model.rooms.data', 'model.videoStream')
  get rooms() {
    const rooms = [];
    if (this.model.videoStream && this.model.videoStream.name) {
      const item = this.store.createRecord('microlocation', {
        name              : this.model.videoStream.name,
        isGlobalEventRoom : this.model.videoStream?.isGlobalEventRoom,
        isChatEnabled     : this.model.videoStream?.isChatEnabled,
        isVideoStream     : true
      });
      rooms.pushObject(item);
    }
    rooms.pushObjects(this.model.rooms?.data);
    return rooms;
  }

  @action
  async changeRoomChatStatus(room) {
    room.isChatEnabled = !room.isChatEnabled;
    if (room.isGlobalEventRoom) {
      room.isGlobalEventRoom = !room.isGlobalEventRoom;
    }
    if (!room.isVideoStream) {
      await room.save();
    } else {
      const { videoStream } = this.model;
      videoStream.isChatEnabled = room.isChatEnabled;
      videoStream.isGlobalEventRoom = room.isGlobalEventRoom;
      await videoStream.save();
    }
  }

  @action
  async setGlobalEventRoom(room) {
    room.isGlobalEventRoom = !room.isGlobalEventRoom;
    if (room.isChatEnabled) {
      room.isChatEnabled = !room.isChatEnabled;
    }
    if (!room.isVideoStream) {
      await room.save();
    } else {
      const { videoStream } = this.model;
      videoStream.isChatEnabled = room.isChatEnabled;
      videoStream.isGlobalEventRoom = room.isGlobalEventRoom;
      await videoStream.save();
    }
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
