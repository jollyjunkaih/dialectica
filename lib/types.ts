export interface CategoryWithTopics {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
  slug: string;
  createdAt: Date;
  topics: TopicSummary[];
}

export interface TopicSummary {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  coverColor: string;
  status: string;
  createdAt: Date;
}

export interface TopicWithNodes {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  categoryId: string;
  coverColor: string;
  status: string;
  nodes: NodeWithChildren[];
  createdAt: Date;
}

export interface NodeWithChildren {
  id: string;
  title: string;
  body: string | null;
  type: string;
  topicId: string;
  parentId: string | null;
  children: NodeWithChildren[];
  order: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
