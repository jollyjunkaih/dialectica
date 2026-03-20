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
  const religion = await prisma.category.create({
    data: {
      name: "Religion",
      icon: "⛪",
      color: "#8b5cf6",
      slug: "religion",
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

  // Create topics for Religion
  const eucharist = await prisma.topic.create({
    data: {
      title: "The Eucharist",
      description:
        "Exploring the theology, history, and practice of the Eucharist across Christian traditions",
      slug: "the-eucharist",
      categoryId: religion.id,
      coverColor: "#7c3aed",
    },
  });

  const theodicy = await prisma.topic.create({
    data: {
      title: "The Problem of Evil",
      description:
        "Why does suffering exist if God is all-powerful and all-good?",
      slug: "problem-of-evil",
      categoryId: religion.id,
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

  // --- Rich node tree for "The Eucharist" (3+ levels deep) ---

  // Level 1: Root question
  const rootQ = await prisma.node.create({
    data: {
      title: "Is the Eucharist literally the body and blood of Christ?",
      body: "This is the central question dividing Christian traditions for centuries. Different denominations have radically different answers.",
      type: "QUESTION",
      topicId: eucharist.id,
      order: 0,
    },
  });

  // Level 2: Viewpoints under root question
  const catholicView = await prisma.node.create({
    data: {
      title: "Catholic View: Transubstantiation",
      body: "The Catholic Church teaches that the bread and wine become the actual body and blood of Christ during consecration. The 'substance' changes while the 'accidents' (appearance, taste, etc.) remain. This was formally defined at the Fourth Lateran Council (1215) and reaffirmed at the Council of Trent.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: rootQ.id,
      order: 0,
    },
  });

  const protestantView = await prisma.node.create({
    data: {
      title: "Protestant View: Symbolic Memorial",
      body: "Many Protestant traditions, particularly those following Zwingli, view the Eucharist as a symbolic memorial meal. The bread and wine represent but do not become Christ's body and blood. It is an act of remembrance and community.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: rootQ.id,
      order: 1,
    },
  });

  const lutheranView = await prisma.node.create({
    data: {
      title: "Lutheran View: Sacramental Union",
      body: "Luther proposed 'sacramental union' — Christ is truly present 'in, with, and under' the bread and wine, but the bread and wine also remain. This is sometimes called consubstantiation, though Lutherans reject that term.",
      type: "VIEWPOINT",
      topicId: eucharist.id,
      parentId: rootQ.id,
      order: 2,
    },
  });

  // Level 3: Questions under Catholic viewpoint
  const philosophyQ = await prisma.node.create({
    data: {
      title: "Does Aristotelian metaphysics hold up to modern science?",
      body: "Transubstantiation relies on Aristotle's distinction between substance and accidents. Is this framework still valid?",
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

  // Level 3: Question under Protestant viewpoint
  await prisma.node.create({
    data: {
      title: 'What did Jesus mean by "This is my body"?',
      body: "Protestants argue Jesus often spoke metaphorically ('I am the door', 'I am the vine'). Catholics argue the Aramaic context and John 6 suggest literalism.",
      type: "QUESTION",
      topicId: eucharist.id,
      parentId: protestantView.id,
      order: 0,
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
      title: "Aristotelian metaphysics operates at a different level",
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

  // Seed some nodes for other topics
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
