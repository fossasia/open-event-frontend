export default function(server) {
  server.createList('event-type', 10, {
    events: server.createList('event', 10)
  });
  server.createList('event-topic', 10);
  server.createList('event-sub-topic', 10);
}
