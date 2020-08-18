{{#ui-accordion class="styled" as |execute|}}
  <div class="title" style="background-color:{{this.session.track.color}}">
    {{this.session.track.name}}
    {{#if this.session.startsAt}}
      {{general-date this.session.startsAt}} - {{general-date this.session.endsAt}}
    {{/if}}
  </div>
  <div class="content" style="background-color:{{this.session.track.color}}">
    Session Name - {{this.session.title}}
    <div class="ui divider"></div>
    {{#each this.session.speakers as |speaker|}}
      <img alt="speaker" class="ui tiny avatar image" src="{{if speaker.thumbnailImageUrl speaker.thumbnailImageUrl (if speaker.photoUrl speaker.photoUrl '/images/placeholders/avatar.png')}}"><br><br>
      {{speaker.name}}
    {{/each}}
  </div>
{{/ui-accordion}}
