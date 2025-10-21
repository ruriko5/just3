create policy "Enable insert for users based on userId"
on "public"."dones"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = "userId"));




