import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.i18n.t('Messages');
  },
  model() {
    return [{
      recipient: [
        {
          name: 'Organizer'
        },
        {
          name: 'Speaker'
        }
      ],
      trigger      : 'Title1',
      emailMessage : {
        subject : 'Email subject1',
        message : 'Hi, the schedule for session1 has been changed'
      },
      notificationMessage: {
        subject : 'Notification subject1',
        message : 'Hi, the schedule for session1 has been changed'
      },
      option: {
        mail         : true,
        notification : false,
        userControl  : true
      },
      sentAt: new Date()
    },
    {
      recipient: [
        {
          name: 'Organizer'
        },
        {
          name: 'Speaker'
        }
      ],
      trigger      : 'Title2',
      emailMessage : {
        subject : 'Email subject2',
        message : 'Hi, the schedule for session2 has been changed'
      },
      notificationMessage: {
        subject : 'Notification subject2',
        message : 'Hi, the schedule for session2 has been changed'
      },
      option: {
        mail         : true,
        notification : false,
        userControl  : true
      },
      sentAt: new Date()
    },
    {
      recipient: [
        {
          name: 'Organizer'
        },
        {
          name: 'Speaker'
        }
      ],
      trigger      : 'Title3',
      emailMessage : {
        subject : 'Email subject3',
        message : 'Hi, the schedule for session3 has been changed'
      },
      notificationMessage: {
        subject : 'Notification subject3',
        message : 'Hi, the schedule for session3 has been changed'
      },
      option: {
        mail         : true,
        notification : false,
        userControl  : true
      },
      sentAt: new Date()
    },
    {
      recipient: [
        {
          name: 'Organizer'
        },
        {
          name: 'Speaker'
        }
      ],
      trigger      : 'Title3',
      emailMessage : {
        subject : 'Email subject3',
        message : 'Hi, the schedule for session3 has been changed'
      },
      notificationMessage: {
        subject : 'Notification subject3',
        message : 'Hi, the schedule for session3 has been changed'
      },
      option: {
        mail         : true,
        notification : false,
        userControl  : true
      },
      sentAt: new Date()
    },
    {
      recipient: [
        {
          name: 'Organizer'
        },
        {
          name: 'Speaker'
        }
      ],
      trigger      : 'Title3',
      emailMessage : {
        subject : 'Email subject3',
        message : 'Hi, the schedule for session3 has been changed'
      },
      notificationMessage: {
        subject : 'Notification subject3',
        message : 'Hi, the schedule for session3 has been changed'
      },
      option: {
        mail         : true,
        notification : false,
        userControl  : true
      },
      sentAt: new Date()
    },
    {
      recipient: [
        {
          name: 'Organizer'
        },
        {
          name: 'Speaker'
        }
      ],
      trigger      : 'Title1',
      emailMessage : {
        subject : 'Email subject4',
        message : 'Hi, the schedule for session4 has been changed'
      },
      notificationMessage: {
        subject : 'Notification subject4',
        message : 'Hi, the schedule for session4 has been changed'
      },
      option: {
        mail         : true,
        notification : false,
        userControl  : true
      },
      sentAt: new Date()
    },
    {
      recipient: [
        {
          name: 'Organizer'
        },
        {
          name: 'Speaker'
        }
      ],
      trigger      : 'Title5',
      emailMessage : {
        subject : 'Email subject5',
        message : 'Hi, the schedule for session5 has been changed'
      },
      notificationMessage: {
        subject : 'Notification subject5',
        message : 'Hi, the schedule for session5 has been changed'
      },
      option: {
        mail         : true,
        notification : false,
        userControl  : true
      },
      sentAt: new Date()
    }];
  }
});
