alter table "public"."dones" drop constraint "dones_status_check";

alter table "public"."todos" drop constraint "todos_status_check";

alter table "public"."wannas" drop constraint "wannas_status_check";

alter table "public"."dones" alter column "status" set default 'Done'::text;

alter table "public"."todos" alter column "status" set default 'Todo'::text;

alter table "public"."wannas" alter column "status" set default 'Wanna'::text;

alter table "public"."dones" add constraint "dones_status_check" CHECK ((status = 'Done'::text)) not valid;

alter table "public"."dones" validate constraint "dones_status_check";

alter table "public"."todos" add constraint "todos_status_check" CHECK ((status = 'Todo'::text)) not valid;

alter table "public"."todos" validate constraint "todos_status_check";

alter table "public"."wannas" add constraint "wannas_status_check" CHECK ((status = 'Wanna'::text)) not valid;

alter table "public"."wannas" validate constraint "wannas_status_check";



