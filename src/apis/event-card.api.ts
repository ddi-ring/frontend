import ddi from "@ddi-ring/api";

const host = "https://api.ddi-ring.com";

export function getEventCardTemplates(
  params: ddi.functional.event_card_templates.paginate.Query
) {
  return ddi.functional.event_card_templates.paginate({ host }, params);
}

export function getEventCardTemplate({
  eventCardTemplateId,
}: {
  eventCardTemplateId: string;
}) {
  return ddi.functional.event_card_templates.get({ host }, eventCardTemplateId);
}

export function getEventCard({ eventCardId }: { eventCardId: string }) {
  return ddi.functional.event_cards.get({ host }, eventCardId);
}

export function createEventCard(
  params: ddi.functional.event_cards.create.Input
) {
  return ddi.functional.event_cards.create({ host }, params);
}

export function uploadEventCardFile(
  params: ddi.functional.event_cards.file.create.Input
) {
  return ddi.functional.event_cards.file.create({ host }, params);
}
