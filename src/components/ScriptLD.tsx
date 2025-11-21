interface ScriptLDProps {
  json: Record<string, unknown> | Record<string, unknown>[];
}

const ScriptLD = ({ json }: ScriptLDProps) => (
  <script type="application/ld+json" suppressHydrationWarning>
    {JSON.stringify(json)}
  </script>
);

export default ScriptLD;
