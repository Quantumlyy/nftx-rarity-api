export function getPropWeight(t: any, e: any, r: any) {
  return (t.isMatch && !r) ||
    (e.combined && t.hasCombined) ||
    (!e.combined && t.isCombined)
    ? 0
    : e.propWeights &&
      void 0 !== e.propWeights[t.name] &&
      e.weights &&
      'data' == t.type &&
      'score' == e.method
    ? e.propWeights[t.name]
    : 'primaryKey' == t.type || 'data' == t.type
    ? 0
    : e.weights && e.propWeights
    ? void 0 === e.propWeights[t.name]
      ? 1
      : e.propWeights[t.name]
    : 1;
}
