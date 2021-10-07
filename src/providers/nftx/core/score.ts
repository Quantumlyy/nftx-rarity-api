export function traitScore(withTrait: number, totalSupply: number) {
  return 1 / (withTrait / totalSupply);
}
