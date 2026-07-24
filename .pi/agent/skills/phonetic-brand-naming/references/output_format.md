# Output Format (Contract)

Return a single response that is fully contained inside `<Deliverable>...</Deliverable>`, using the exact tag names and ordering below.

Notes:

- Populate the tag bodies; keep the tags.
- For lists, repeat the provided child tags (e.g., multiple `<Name>...</Name>`).
- Do not add extra top-level sections outside this template.

Template:

<Deliverable>
  <StrategySpine>
    <PositioningStatement></PositioningStatement>
    <Audience></Audience>
    <Differentiators></Differentiators>
    <Personality></Personality>
    <DesiredEmotion></DesiredEmotion>
    <NamingDirection></NamingDirection>
  </StrategySpine>

  <NamingBrief>
    <AllowedNameStyles></AllowedNameStyles>
    <LengthTargets></LengthTargets>
    <SoundTargets></SoundTargets>
    <MustHave></MustHave>
    <MustAvoid></MustAvoid>
    <RegionsAndLanguages></RegionsAndLanguages>
    <ExtensionPlan></ExtensionPlan>
  </NamingBrief>

  <NameCandidates>
    <Bucket name="Suggestive"></Bucket>
    <Bucket name="Metaphor/Imagery"></Bucket>
    <Bucket name="Coined"></Bucket>
    <Bucket name="Compound/Portmanteau"></Bucket>
    <Bucket name="PremiumMinimal"></Bucket>
  </NameCandidates>

  <ScoringTable></ScoringTable>

  <Top10>
    <Name></Name>
  </Top10>

  <StressTests></StressTests>

  <FinalShortlist>
    <Finalist></Finalist>
  </FinalShortlist>

  <Recommendation>
    <Winner></Winner>
    <RunnerUp></RunnerUp>
    <SafeChoice></SafeChoice>
    <BoldChoice></BoldChoice>
    <NextStepsChecklist></NextStepsChecklist>
  </Recommendation>
</Deliverable>

