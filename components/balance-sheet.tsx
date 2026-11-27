/**
 * The goal-based balance sheet, as an illustration with made-up figures: what a family owns, owes and has covered, and
 * the goals it is for. Every line is marked right (we leave it) or needs attention (we help). On the homepage and on
 * /approach.
 */

type Line = { name: string; note?: string; amount?: string; status?: string; ok: boolean };

const OWN: Line[] = [
  { name: "Home", amount: "₹2.40 Cr", ok: true },
  { name: "Equity mutual funds", note: "Well spread, held for the long run", amount: "₹85 L", ok: true },
  { name: "Fixed deposits", note: "Most of the liquid money, taxed every year", amount: "₹60 L", ok: false },
  { name: "PPF and EPF", amount: "₹45 L", ok: true },
  { name: "Gold", amount: "₹20 L", ok: true },
];
const OWE: Line[] = [
  { name: "Home loan", note: "Rate above what banks offer today", amount: "₹55 L", ok: false },
  { name: "Car loan", amount: "₹10 L", ok: true },
];
const COVER: Line[] = [
  { name: "Family health cover", note: "₹5 L for four people", amount: "₹5 L", ok: false },
  { name: "Motor and home cover", amount: "In place", ok: true },
];
const GOALS: Line[] = [
  { name: "Children's education", note: "2031 · from the equity funds", status: "On track", ok: true },
  { name: "Retire at 60", note: "2040 · PPF, EPF and equity", status: "On track", ok: true },
  { name: "A safety net", note: "Six months of spending, held in deposits", status: "Too much here", ok: false },
  { name: "A protected family", note: "Health cover for four", status: "Cover too low", ok: false },
];

function Row({ line }: { line: Line }) {
  return (
    <div className={`line ${line.ok ? "ok" : "fix"}`}>
      <i aria-hidden="true" />
      <span>
        {line.name}
        {line.note ? <small>{line.note}</small> : null}
        <span className="sr-only">{line.ok ? " (right, we leave it)" : " (needs attention)"}</span>
      </span>
      {line.amount ? <span className="amt">{line.amount}</span> : <span className="st">{line.status}</span>}
    </div>
  );
}

function Total({ label, amount }: { label: string; amount: string }) {
  return (
    <div className="line total">
      <i aria-hidden="true" />
      <span>{label}</span>
      <span className="amt">{amount}</span>
    </div>
  );
}

export function BalanceSheetCards() {
  return (
    <>
      <div className="cards" data-reveal-group="">
        <div className="card" role="figure" aria-labelledby="bs-title">
          <div className="card-head">
            <b id="bs-title">The family balance sheet</b>
          </div>
          <div className="card-body cols">
            <div className="lcol">
              <p>What you own</p>
              {OWN.map((l) => (
                <Row key={l.name} line={l} />
              ))}
              <Total label="Total" amount="₹4.50 Cr" />
            </div>
            <div className="lcol">
              <p>What you owe</p>
              {OWE.map((l) => (
                <Row key={l.name} line={l} />
              ))}
              <p>Protection</p>
              {COVER.map((l) => (
                <Row key={l.name} line={l} />
              ))}
              <Total label="Net worth" amount="₹3.85 Cr" />
            </div>
          </div>
          <div className="card-foot">
            <span>
              <b>Six lines</b> right, left untouched. <b>Three</b> to work on, in a written plan.
            </span>
          </div>
        </div>

        <div className="card" role="figure" aria-labelledby="goals-title">
          <div className="card-head">
            <b id="goals-title">Your goals</b>
          </div>
          <div className="card-body">
            <div className="lcol">
              <p>What the balance sheet is for</p>
              {GOALS.map((l) => (
                <Row key={l.name} line={l} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="mono caption">An illustration with made-up figures</p>
    </>
  );
}

/** The key to the marks: right, or needs attention. */
export function BalanceKey() {
  return (
    <div className="key">
      <span className="k-ok">Right, we leave it</span>
      <span className="k-fix">Needs attention, we help</span>
    </div>
  );
}

