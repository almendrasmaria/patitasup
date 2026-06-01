-- Re-add the DRAFT publication status (now set via the "Guardar borrador"
-- action in the publish dialog instead of a manual status selector).
ALTER TYPE "PublicationStatus" ADD VALUE 'DRAFT';
