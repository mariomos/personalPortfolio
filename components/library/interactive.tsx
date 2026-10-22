"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Field, Input, Textarea } from "@/components/ui/field";
import { StateLabel } from "@/components/annotation";

/** The specimens that need state to be worth looking at. */
export function SwitchSpecimen() {
  const [on, setOn] = useState(true);
  return (
    <>
      <span className="specimen__cell">
        <Switch checked={on} onChange={setOn}>
          <span className="mono">interactive</span>
        </Switch>
        <StateLabel active={on}>{on ? "pressed" : "not pressed"}</StateLabel>
      </span>
      <span className="specimen__cell">
        <Switch checked onChange={() => {}} disabled>
          <span className="mono">disabled</span>
        </Switch>
        <StateLabel>disabled</StateLabel>
      </span>
    </>
  );
}

export function FieldSpecimen() {
  const [value, setValue] = useState("");
  const invalid = value.length > 0 && !value.includes("@");

  return (
    <div className="stack stack-6" style={{ width: "100%", maxWidth: "24rem" }}>
      <div className="specimen__cell" style={{ width: "100%" }}>
        <Field
          label="Email"
          hint="Validates on input, not on blur."
          error={invalid ? "That does not look like an email address." : undefined}
        >
          {({ id, describedBy }) => (
            <Input
              id={id}
              type="email"
              value={value}
              placeholder="you@company.com"
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
        </Field>
        <StateLabel active={invalid}>{invalid ? "invalid" : value ? "filled" : "empty"}</StateLabel>
      </div>

      <div className="specimen__cell" style={{ width: "100%" }}>
        <Field label="Disabled">
          {({ id }) => <Input id={id} disabled defaultValue="Not editable" />}
        </Field>
        <StateLabel>disabled</StateLabel>
      </div>

      <div className="specimen__cell" style={{ width: "100%" }}>
        <Field label="Notes" hint="Resizes vertically only.">
          {({ id, describedBy }) => (
            <Textarea id={id} aria-describedby={describedBy} placeholder="Longer text" />
          )}
        </Field>
        <StateLabel>textarea</StateLabel>
      </div>
    </div>
  );
}
