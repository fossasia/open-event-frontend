import classic from 'ember-classic-decorator';
import { orderBy } from 'lodash-es';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { levels } from 'open-event-frontend/utils/dictionary/levels';
import { languages } from 'open-event-frontend/utils/dictionary/languages';

@classic
export default class ScheduleMenuFilter extends Component {

    @tracked activeSession = this.router.currentRoute.queryParams.sessionType ? this.router.currentRoute.queryParams.sessionType.split(',') : [];

    @tracked activeSessionLevel = this.router.currentRoute.queryParams.level ? this.router.currentRoute.queryParams.level.split(',') : [];

    @tracked activeRoom = this.router.currentRoute.queryParams.room ? this.router.currentRoute.queryParams.room.split(',') : [];

    @tracked activeTrack = this.router.currentRoute.queryParams.track ? this.router.currentRoute.queryParams.track.split(',') : [];

    @tracked activeLanguage = this.router.currentRoute.queryParams.language ? this.router.currentRoute.queryParams.language.split(',') : [];

    @tracked levels = orderBy(levels, 'position');

    @tracked languageList = [];

    @action
    removeActiveSession() {
      this.activeSession = [];
    }

    @action
    removeActiveSessionLevel() {
      this.activeSessionLevel = [];
    }

    @action
    removeActiveLanguage() {
      this.activeLanguage = [];
    }

    @action
    removeActiveRoom() {
      this.activeRoom = [];
    }

    @action
    removeActiveTrack() {
      this.activeTrack = [];
    }

    removeActiveClass(name) {
      const activeEls = document.querySelectorAll(`.${name}.link-item.active`);
      activeEls.forEach(el => {
        el.classList.remove('active');
      });
    }

    @action
    sessionFilter(name) {
      this.activeSession = this.router.currentRoute.queryParams.sessionType ? this.router.currentRoute.queryParams.sessionType.split(',') : [];
      if (this.activeSession.includes(name)) {
        this.activeSession = this.activeSession.filter(session => session !== name);
      } else {
        this.activeSession = [...this.activeSession, name];
      }
      this.router.transitionTo('public.sessions', { queryParams: { 'sessionType': this.activeSession } });
    }

    @action
    sessionLevelFilter(level) {
      this.activeSessionLevel = this.router.currentRoute.queryParams.level ? this.router.currentRoute.queryParams.level.split(',') : [];
      if (this.activeSessionLevel.includes(level)) {
        this.activeSessionLevel = this.activeSessionLevel.filter(val => val !== level);
      } else {
        this.activeSessionLevel = [...this.activeSessionLevel, level];
      }
      this.router.transitionTo('public.sessions', { queryParams: { 'level': this.activeSessionLevel } });
    }

    @action
    roomFilter(name) {
      this.activeRoom = this.router.currentRoute.queryParams.room ? this.router.currentRoute.queryParams.room.split(',') : [];
      if (this.activeRoom.includes(name)) {
        this.activeRoom = this.activeRoom.filter(room => room !== name);
      } else {
        this.activeRoom = [...this.activeRoom, name];
      }
      this.router.transitionTo('public.sessions', { queryParams: { 'room': this.activeRoom } });
    }

    @action
    trackFilter(name) {
      this.activeTrack = this.router.currentRoute.queryParams.track ? this.router.currentRoute.queryParams.track.split(',') : [];
      if (this.activeTrack.includes(name)) {
        this.activeTrack = this.activeTrack.filter(track => track !== name);
      } else {
        this.activeTrack = [...this.activeTrack, name];
      }
      this.router.transitionTo('public.sessions', { queryParams: { 'track': this.activeTrack } });
    }

    @action
    languageFilter(name) {
      this.activeLanguage = this.router.currentRoute.queryParams.language ? this.router.currentRoute.queryParams.language.split(',') : [];
      if (this.activeLanguage.includes(name)) {
        this.activeLanguage = this.activeLanguage.filter(language => language !== name);
      } else {
        this.activeLanguage = [...this.activeLanguage, name];
      }
      this.router.transitionTo('public.sessions', { queryParams: { 'language': this.activeLanguage } });
    }

    @action
    applyFilter(value, filterType) {
      const params = this.router.currentRoute.queryParams;
      if (!params.track) {
        this.activeTrack = [];
      }
      if (!params.language) {
        this.activeLanguage = [];
      }
      if (!params.room) {
        this.activeRoom = [];
      }
      if (!params.sessionType) {
        this.activeSession = [];
      }
      value = value + ':';
      if (filterType === 'room') {
        if (this.activeRoom.includes(value)) {
          this.activeRoom = this.activeRoom.filter(room => room !== value);
        } else {
          this.activeRoom = [...this.activeRoom, value];
        }
        this.router.transitionTo('public.sessions', { queryParams: { 'room': this.activeRoom } });
      } else {
        if (this.activeTrack.includes(value)) {
          this.activeTrack = this.activeTrack.filter(track => track !== value);
        } else {
          this.activeTrack = [...this.activeTrack, value];
        }
        this.router.transitionTo('public.sessions', { queryParams: { 'track': this.activeTrack } });
      }
    }

    @computed('event.tracks')
    get trackList() {
      return orderBy(this.event.tracks.toArray(), ['position']);
    }

    @computed('event.microlocations')
    get microlocationList() {
      return orderBy(this.event.microlocations.toArray(), ['position']);
    }

    @computed('event.sessionTypes')
    get sessionTypeList() {
      return orderBy(this.event.sessionTypes.toArray(), ['position']);
    }

    async didInsertElement() {
      const response = await this.loader.load(`/events/${this.event.id}/sessions/languages`);
      const languageList = [];
      languages.forEach(language => {
        response.forEach(item => {
          if (item === language.name) {
            languageList.push(language);
          }
        });
      });
      this.set('languageList', languageList);
    }

    @computed('languageList.@each')
    get languageFilterList() {
      return orderBy(this.languageList.toArray(), ['name']);
    }
}
