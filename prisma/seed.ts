import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.node.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create categories
  const christianity = await prisma.category.create({
    data: {
      name: "Christianity",
      icon: "✝️",
      color: "#7c3aed",
      slug: "christianity",
    },
  });

  const science = await prisma.category.create({
    data: {
      name: "Science",
      icon: "🔬",
      color: "#06b6d4",
      slug: "science",
    },
  });

  // Create topics for Christianity
  const eucharist = await prisma.topic.create({
    data: {
      title: "The Eucharist",
      description:
        "When Jesus said 'This is my body' at the Last Supper, what did he mean? Does the bread and wine literally become Christ, or is his presence symbolic or spiritual? This question fractures Christianity into distinct traditions.",
      slug: "the-eucharist",
      categoryId: christianity.id,
      coverColor: "#7c3aed",
    },
  });

  const theodicy = await prisma.topic.create({
    data: {
      title: "The Problem of Evil",
      description:
        "Why does suffering exist if God is all-powerful and all-good?",
      slug: "problem-of-evil",
      categoryId: christianity.id,
      coverColor: "#dc2626",
    },
  });

  // Create topics for Science
  const consciousness = await prisma.topic.create({
    data: {
      title: "Consciousness",
      description:
        "What is consciousness and how does it arise from physical matter?",
      slug: "consciousness",
      categoryId: science.id,
      coverColor: "#0891b2",
    },
  });

  const entropy = await prisma.topic.create({
    data: {
      title: "Entropy & Time",
      description:
        "Why does time flow in one direction? The arrow of time and thermodynamics.",
      slug: "entropy-and-time",
      categoryId: science.id,
      coverColor: "#059669",
    },
  });

  // =====================================================
  // THE EUCHARIST — Deep node tree from theological debate
  // =====================================================

  // === ROOT QUESTION 1: The Core Question ===
  const rootQ = await prisma.node.create({
    data: {
      title: "Is the Eucharist literally the body and blood of Christ?",
      body: "When Jesus said 'This is my body' at the Last Supper, what did he mean? Does the bread and wine literally become Christ, or is his presence symbolic/spiritual? The answer fractures Christianity into distinct traditions. This is one of the most theologically rich debates in Christian history.",
      type: "QUESTION",
      topicId: eucharist.id,
      order: 0,
    },
  });

  // --- Level 2: The Four Major Positions (Viewpoints) ---

  const catholicView = await prisma.node.create({
    data: {
      title: "Catholic View: Transubstantiation",
      body: "The bread and wine substantially become the body and blood of Christ — the outward appearances (accidents) remain, but the underlying substance changes entirely. This relies on Aristotelian metaphysics (substance vs. accidents). Christ is therefore physically, truly, and wholly present — body, blood, soul, and divinity — in every consecrated host. The mass is thus a re-presentation of the sacrifice of Calvary, not merely a memorial. This was formally defined at the Fourth Lateran Council (1215) and reaffirmed at the Council of Trent.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: rootQ.id,
      order: 0,
    },
  });

  const lutheranView = await prisma.node.create({
    data: {
      title: "Lutheran View: Consubstantiation (Real Presence)",
      body: "Luther rejected Catholic metaphysics but insisted on a real presence. Christ is present 'in, with, and under' the bread and wine — the elements don't change, but Christ is genuinely there. He famously refused to budge from 'Hoc est corpus meum' (This IS my body) at the Marburg Colloquy (1529), breaking with Zwingli. Lutherans themselves reject the term 'consubstantiation' but affirm sacramental union.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: rootQ.id,
      order: 1,
    },
  });

  const calvinistView = await prisma.node.create({
    data: {
      title: "Reformed/Calvinist View: Spiritual Real Presence",
      body: "Calvin took a middle path — Christ is truly present, but spiritually, not physically. The faithful believer receives Christ's body and blood spiritually through the elements, lifted by the Spirit to the ascended Christ in heaven. It's not mere symbol, but not physical either. This is arguably the most sophisticated Reformed position and dominates Presbyterian and much of Anglican evangelical thought.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: rootQ.id,
      order: 2,
    },
  });

  const zwinglianView = await prisma.node.create({
    data: {
      title: "Zwinglian/Baptist View: Memorial/Symbolic",
      body: "Zwingli argued 'is' means 'signifies' — the Eucharist is a commemoration and pledge of faith, nothing more. Christ's body is in heaven; it cannot be physically on thousands of altars simultaneously. This view became the foundation for most Baptist and broader evangelical theology.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: rootQ.id,
      order: 3,
    },
  });

  const anglicanView = await prisma.node.create({
    data: {
      title: "The Anglican Position: Deliberately Ambiguous",
      body: "The Church of England intentionally avoided settling the question, for political and theological reasons. The 39 Articles (1563) reject transubstantiation as unscriptural, but don't define exactly what does happen. The Book of Common Prayer uses language carefully crafted to be acceptable to both Reformed and more Catholic-leaning Anglicans. The phrase 'the Body and Blood of Christ' is used without specifying the mechanism. This 'studied ambiguity' was a feature, not a bug — it held a broad church together. Within Anglicanism today you'll find a full spectrum: Anglo-Catholics who hold something very close to transubstantiation, and Evangelicals who hold a Zwinglian memorial view, with many in between holding a Calvinist spiritual presence.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: rootQ.id,
      order: 4,
    },
  });

  // --- Level 3: Questions under Catholic View ---

  const philosophyQ = await prisma.node.create({
    data: {
      title: "Does Aristotelian metaphysics hold up to modern science?",
      body: "Transubstantiation relies on Aristotle's distinction between substance and accidents. Is this framework still valid in light of modern physics?",
      type: "QUESTION",
      topicId: eucharist.id,
      parentId: catholicView.id,
      order: 0,
    },
  });

  const miracleQ = await prisma.node.create({
    data: {
      title: "What about Eucharistic miracles?",
      body: "Several alleged miracles involve consecrated hosts displaying properties of human heart tissue. How should these be evaluated?",
      type: "QUESTION",
      topicId: eucharist.id,
      parentId: catholicView.id,
      order: 1,
    },
  });

  const sacrificeQ = await prisma.node.create({
    data: {
      title: "Is the mass a sacrifice offered again, or a one-time event merely remembered?",
      body: "Catholics say the mass is a re-presentation of the sacrifice of Calvary. Protestants point to Hebrews 9:28 — Christ was sacrificed once for all. Is there a meaningful distinction between re-presentation and repetition?",
      type: "QUESTION",
      topicId: eucharist.id,
      parentId: catholicView.id,
      order: 2,
    },
  });

  // Level 4: Answers under philosophy question
  await prisma.node.create({
    data: {
      title: "Aristotelian categories are outdated",
      body: "Modern physics describes matter in terms of quantum fields and particles. The substance/accident distinction doesn't map onto contemporary physics. The concept of 'substance' as an underlying metaphysical reality is no longer part of scientific discourse.",
      type: "ANSWER",
      topicId: eucharist.id,
      parentId: philosophyQ.id,
      order: 0,
    },
  });

  await prisma.node.create({
    data: {
      title: "Aristotelian metaphysics operates at a different level than physics",
      body: "Defenders argue that Aristotle's categories are about metaphysics, not physics. Science describes how things behave; metaphysics describes what things are. These are complementary, not competing frameworks. Edward Feser and others have defended Neo-Aristotelian metaphysics as fully compatible with modern science.",
      type: "ANSWER",
      topicId: eucharist.id,
      parentId: philosophyQ.id,
      order: 1,
    },
  });

  // Level 4: Under miracle question
  await prisma.node.create({
    data: {
      title: "The Lanciano Miracle and scientific analysis",
      body: "In 1970, Professor Odoardo Linoli analyzed the Lanciano relic and found it to be human cardiac tissue, blood type AB. However, the chain of custody and scientific rigor have been questioned. No peer-reviewed journal has independently confirmed these findings.",
      type: "ANSWER",
      topicId: eucharist.id,
      parentId: miracleQ.id,
      order: 0,
    },
  });

  // Level 4: Under sacrifice question
  await prisma.node.create({
    data: {
      title: "Re-presentation is not repetition",
      body: "Catholic theologians distinguish between the bloody sacrifice of Calvary (once for all) and the unbloody re-presentation in the mass. The mass makes present the same sacrifice across time — it does not add to or repeat it. The Council of Trent explicitly affirmed the once-for-all nature of Calvary while maintaining the sacrificial character of the mass.",
      type: "ANSWER",
      topicId: eucharist.id,
      parentId: sacrificeQ.id,
      order: 0,
    },
  });

  await prisma.node.create({
    data: {
      title: "Hebrews 9:28 rules out any sacrificial mass",
      body: "Protestant exegetes argue that the epistle to the Hebrews deliberately contrasts the repeated Old Testament sacrifices with Christ's once-for-all sacrifice. Any doctrine that re-enacts or re-presents this sacrifice undermines the sufficiency of the cross. The language of 'offering' in the mass contradicts the finality emphasized throughout Hebrews.",
      type: "ANSWER",
      topicId: eucharist.id,
      parentId: sacrificeQ.id,
      order: 1,
    },
  });

  // --- Level 3: Questions under Lutheran View ---

  const marburgQ = await prisma.node.create({
    data: {
      title: "What happened at the Marburg Colloquy (1529)?",
      body: "Luther and Zwingli met to try to unify the Protestant movement but split irreconcilably over the Eucharist. Luther reportedly wrote 'Hoc est corpus meum' on the table in chalk and refused to move. This moment defined the fracture between Lutheran and Reformed traditions.",
      type: "QUESTION",
      topicId: eucharist.id,
      parentId: lutheranView.id,
      order: 0,
    },
  });

  await prisma.node.create({
    data: {
      title: "Can the finite contain the infinite? (Finitum capax infiniti)",
      body: "Lutherans argue that the Incarnation itself proves the finite can contain the infinite — God became man. If Christ's divine nature could inhabit a human body, then Christ can be truly present in bread and wine. Reformed theologians counter with 'finitum non capax infiniti' — the finite cannot contain the infinite — and insist Christ's body remains localized in heaven.",
      type: "QUESTION",
      topicId: eucharist.id,
      parentId: lutheranView.id,
      order: 1,
    },
  });

  // --- Level 3: Questions under Calvinist View ---

  await prisma.node.create({
    data: {
      title: "How does Calvin's 'spiritual real presence' differ from Zwingli's memorialism?",
      body: "Calvin thought Zwingli made the sacrament meaningless by reducing it to bare symbol. For Calvin, the Holy Spirit genuinely lifts the believer to commune with the ascended Christ — there is a real spiritual transaction, not just remembrance. The faithful truly receive Christ, but through faith and the Spirit, not through physical consumption of transformed elements.",
      type: "QUESTION",
      topicId: eucharist.id,
      parentId: calvinistView.id,
      order: 0,
    },
  });

  // --- Level 3: Questions under Zwinglian View ---

  const thisIsMyBodyQ = await prisma.node.create({
    data: {
      title: 'What did Jesus mean by "This is my body"?',
      body: "Zwingli and his allies argued that 'is' means 'signifies,' pointing to Jesus's frequent use of metaphor ('I am the door,' 'I am the vine'). Catholics and Lutherans counter that the Aramaic context and John 6 suggest literalism. John Oecolampadius argued from patristic sources that the early church fathers had always understood this figuratively.",
      type: "QUESTION",
      topicId: eucharist.id,
      parentId: zwinglianView.id,
      order: 0,
    },
  });

  await prisma.node.create({
    data: {
      title: "Andreas Karlstadt's alternative reading",
      body: "Luther's former colleague argued the words 'This is my body' referred to Christ pointing to himself, not to the bread. An eccentric argument but historically notable as an early Reformation dissent from both Catholic and mainstream Protestant readings.",
      type: "ANSWER",
      topicId: eucharist.id,
      parentId: thisIsMyBodyQ.id,
      order: 0,
    },
  });

  // === ROOT QUESTION 2: Why It Matters ===
  const whyItMattersQ = await prisma.node.create({
    data: {
      title: "Why does your view of the Eucharist matter so much?",
      body: "The stakes are enormous because your view of the Eucharist determines the nature of the priesthood, the nature of Christ's sacrifice, ecclesiology, and soteriology.",
      type: "QUESTION",
      topicId: eucharist.id,
      order: 1,
    },
  });

  await prisma.node.create({
    data: {
      title: "It determines the nature of the priesthood",
      body: "If transubstantiation is true, only a validly ordained priest can confect the sacrament; otherwise, ordination is less ontologically distinct. This has profound implications for church governance, apostolic succession, and who can lead worship.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: whyItMattersQ.id,
      order: 0,
    },
  });

  await prisma.node.create({
    data: {
      title: "It determines ecclesiology — who has valid sacraments?",
      body: "Catholic and Orthodox traditions hold that invalid Eucharist means something essential is missing from Protestant worship. This is why intercommunion remains one of the biggest barriers to Christian unity.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: whyItMattersQ.id,
      order: 1,
    },
  });

  await prisma.node.create({
    data: {
      title: "It determines soteriology — how is grace conveyed?",
      body: "If grace is genuinely conveyed through the physical elements, the sacramental system becomes the primary channel of salvation. If the Eucharist is memorial, salvation is primarily through faith and scripture, not through physical sacraments.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: whyItMattersQ.id,
      order: 2,
    },
  });

  // === ROOT QUESTION 3: The Philosophical Fault Line ===
  const philosophicalQ = await prisma.node.create({
    data: {
      title: "Can matter bear the divine in a direct, substantial way?",
      body: "At bottom, the Eucharistic debate is about whether matter can bear the divine in a direct, substantial way. This touches the deepest questions about how God relates to the physical world. It's a debate that has never been resolved — and arguably never will be.",
      type: "QUESTION",
      topicId: eucharist.id,
      order: 2,
    },
  });

  await prisma.node.create({
    data: {
      title: "Yes — the Incarnation shows God enters matter",
      body: "Catholics argue the Incarnation itself demonstrates that God enters matter directly. If the eternal Word could become flesh, then Christ can be substantially present in bread and wine. The Catholic position is in some ways the more radically materialist one — insisting that God genuinely inhabits matter.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: philosophicalQ.id,
      order: 0,
    },
  });

  await prisma.node.create({
    data: {
      title: "No — the finite cannot contain the infinite (finitum non capax infiniti)",
      body: "Protestants of a Reformed bent are more cautious: the finite cannot contain the infinite. The spiritual is higher than the material, so reducing Christianity to physical eating seems crude. The Protestant trajectory often ends up being more spiritualized and abstract. This also correlates with a higher view of Christ's ascension — his body is at the right hand of the Father, not on earthly altars.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: philosophicalQ.id,
      order: 1,
    },
  });

  // === ROOT QUESTION 4: Notable Historical Figures ===
  const figuresQ = await prisma.node.create({
    data: {
      title: "Who are the notable figures who denied the literal body and blood at the Eucharist?",
      body: "The history of Eucharistic skepticism is long and runs through some of the most consequential minds in Christian history, from medieval precursors through the Reformation and into the modern era.",
      type: "QUESTION",
      topicId: eucharist.id,
      order: 3,
    },
  });

  // --- Medieval Precursors ---
  const medievalView = await prisma.node.create({
    data: {
      title: "Early & Medieval Precursors",
      body: "Even before the Reformation, voices challenged the emerging doctrine of transubstantiation.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: figuresQ.id,
      order: 0,
    },
  });

  await prisma.node.create({
    data: {
      title: "Berengar of Tours (999–1088)",
      body: "Perhaps the first major medieval figure to formally deny transubstantiation. He argued that the bread and wine remain physically unchanged — Christ is present intellectually and spiritually. He was condemned multiple times and forced to recant, but his views kept resurfacing. He's essentially the grandfather of the Reformation Eucharistic debate.",
      type: "ANSWER",
      topicId: eucharist.id,
      parentId: medievalView.id,
      order: 0,
    },
  });

  // --- Reformation Figures ---
  const reformationView = await prisma.node.create({
    data: {
      title: "The Reformation's Central Figures",
      body: "The Reformation brought the Eucharistic question to a crisis point, with multiple reformers taking positions against physical presence.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: figuresQ.id,
      order: 1,
    },
  });

  await prisma.node.create({
    data: {
      title: "Ulrich Zwingli (1484–1531)",
      body: "The most important name in Eucharistic denial. The Swiss reformer argued most forcefully that the Eucharist is purely memorial and symbolic. His clash with Luther at the Marburg Colloquy (1529) is one of history's great theological confrontations. His view became the foundation for most Baptist and broader evangelical theology.",
      type: "ANSWER",
      topicId: eucharist.id,
      parentId: reformationView.id,
      order: 0,
    },
  });

  await prisma.node.create({
    data: {
      title: "John Oecolampadius (1482–1531)",
      body: "Zwingli's key ally and a formidable scholar. He argued from patristic sources that 'is' in 'This is my body' had always been understood figuratively by the early church fathers. His biblical and historical arguments gave the symbolic position serious scholarly weight.",
      type: "ANSWER",
      topicId: eucharist.id,
      parentId: reformationView.id,
      order: 1,
    },
  });

  await prisma.node.create({
    data: {
      title: "Thomas Cranmer (1489–1556)",
      body: "The architect of the Anglican liturgy evolved significantly — moving from a near-Catholic view in his early career to a Calvinist spiritual presence position by the time he wrote the 1552 Book of Common Prayer. He was burned at the stake under Mary I, partly over this very question. His famous act of thrusting his right hand into the flames first — the hand that had signed a recantation — is one of history's most dramatic moments.",
      type: "ANSWER",
      topicId: eucharist.id,
      parentId: reformationView.id,
      order: 2,
    },
  });

  await prisma.node.create({
    data: {
      title: "Heinrich Bullinger (1504–1575)",
      body: "Zwingli's successor in Zurich, who softened the position slightly but remained firmly in the memorial camp. He co-authored the Second Helvetic Confession, which became hugely influential in Reformed churches worldwide.",
      type: "ANSWER",
      topicId: eucharist.id,
      parentId: reformationView.id,
      order: 3,
    },
  });

  // --- Radical Reformers ---
  const radicalView = await prisma.node.create({
    data: {
      title: "Radical Reformers & Anabaptists",
      body: "The Anabaptist tradition generally followed Zwingli in holding a purely symbolic/memorial view of the Eucharist.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: figuresQ.id,
      order: 2,
    },
  });

  await prisma.node.create({
    data: {
      title: "Balthasar Hubmaier (1480–1528)",
      body: "Leading Anabaptist theologian who held a purely symbolic view. Executed by drowning — a grim irony given his views on baptism.",
      type: "ANSWER",
      topicId: eucharist.id,
      parentId: radicalView.id,
      order: 0,
    },
  });

  await prisma.node.create({
    data: {
      title: "Menno Simons (1496–1561)",
      body: "Founder of the Mennonites, held a memorial view. The entire Anabaptist tradition generally followed Zwingli's symbolic understanding of the Eucharist.",
      type: "ANSWER",
      topicId: eucharist.id,
      parentId: radicalView.id,
      order: 1,
    },
  });

  // --- Modern Figures ---
  const modernView = await prisma.node.create({
    data: {
      title: "Later & Modern Figures",
      body: "The Eucharistic debate continued to evolve through the modern era, with liberal theology and evangelicalism both pushing away from physical presence in different ways.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: figuresQ.id,
      order: 3,
    },
  });

  await prisma.node.create({
    data: {
      title: "Charles Spurgeon (1834–1892)",
      body: "The great Baptist preacher held an unambiguously symbolic/memorial view and preached it plainly. His enormous influence cemented this position in much of evangelical Protestantism.",
      type: "ANSWER",
      topicId: eucharist.id,
      parentId: modernView.id,
      order: 0,
    },
  });

  await prisma.node.create({
    data: {
      title: "Friedrich Schleiermacher (1768–1834)",
      body: "The father of modern liberal theology spiritualized the sacraments to the point where physical presence became essentially irrelevant — what mattered was the feeling of devotion and communal consciousness the Eucharist evoked.",
      type: "ANSWER",
      topicId: eucharist.id,
      parentId: modernView.id,
      order: 1,
    },
  });

  await prisma.node.create({
    data: {
      title: "John Wesley (1703–1791) — a partial exception",
      body: "Interestingly, Wesley actually believed strongly in the Eucharist as a 'converting ordinance' and a means of grace, closer to Calvin than Zwingli. But his Methodist heirs largely drifted toward a memorial view.",
      type: "ANSWER",
      topicId: eucharist.id,
      parentId: modernView.id,
      order: 2,
    },
  });

  // === ROOT QUESTION 5: The Underlying Pattern ===
  const patternQ = await prisma.node.create({
    data: {
      title: "What underlying pattern connects those who deny physical presence?",
      body: "Denial of physical presence almost always correlates with several broader theological and philosophical commitments.",
      type: "QUESTION",
      topicId: eucharist.id,
      order: 4,
    },
  });

  await prisma.node.create({
    data: {
      title: "A higher view of Christ's ascension",
      body: "His body is at the right hand of the Father, not on earthly altars. If Christ's body is localized in heaven, it cannot simultaneously be present on thousands of communion tables worldwide.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: patternQ.id,
      order: 0,
    },
  });

  await prisma.node.create({
    data: {
      title: "A suspicion of sacerdotalism",
      body: "If no physical transformation occurs, the priest's role is diminished. The minister becomes a facilitator of remembrance rather than one who confects a sacrament. This has radical implications for church governance and authority.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: patternQ.id,
      order: 1,
    },
  });

  await prisma.node.create({
    data: {
      title: "A more Platonic instinct",
      body: "The spiritual is higher than the material, so reducing Christianity to physical eating seems crude. This philosophical orientation privileges the immaterial over the material in a way that makes transubstantiation feel unnecessary or even offensive.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: patternQ.id,
      order: 2,
    },
  });

  await prisma.node.create({
    data: {
      title: "Humanism and later rationalism",
      body: "Erasmus, though never breaking with Rome, was deeply uncomfortable with popular eucharistic piety and superstition around the host. The Enlightenment and rationalist movements further eroded acceptance of miraculous physical transformation.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: patternQ.id,
      order: 3,
    },
  });

  // =====================================================
  // OTHER TOPICS — basic seed nodes
  // =====================================================

  await prisma.node.create({
    data: {
      title: "Why does God allow natural disasters?",
      body: "Natural evil — earthquakes, diseases, tsunamis — seems harder to explain than moral evil caused by free will.",
      type: "QUESTION",
      topicId: theodicy.id,
      order: 0,
    },
  });

  await prisma.node.create({
    data: {
      title: "Is consciousness reducible to brain activity?",
      body: "The 'hard problem of consciousness' asks why physical processes give rise to subjective experience at all.",
      type: "QUESTION",
      topicId: consciousness.id,
      order: 0,
    },
  });

  await prisma.node.create({
    data: {
      title: "Why does entropy increase with time?",
      body: "The second law of thermodynamics states entropy tends to increase. But the fundamental laws of physics are time-symmetric. Where does the asymmetry come from?",
      type: "QUESTION",
      topicId: entropy.id,
      order: 0,
    },
  });

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@dialectica.app",
      passwordHash: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
