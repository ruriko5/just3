alter table "public"."dones" alter column "status" set default 'done'::text;

alter table "public"."todos" alter column "status" set default 'todo'::text;

alter table "public"."wannas" alter column "status" set default 'wanna'::text;



