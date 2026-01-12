"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Page,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Text,
  View,
  Font,
  pdf,
} from "@react-pdf/renderer";
import { Document as ShowPDF, Page as ShowPage, pdfjs } from "react-pdf";
import { NodeData } from "@/types/node";
import { PARENT_ID_ROOT } from "../_util/createNode";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

Font.register({
  family: "ZenKakuGothicNew",
  src: "/fonts/ZenKakuGothicNew-Regular.ttf",
});

interface Location {
  id: string;
  title: string;
  address?: string;
  lat?: number;
  lng?: number;
  thumbnail?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

interface NodeWithDepth extends NodeData {
  depth: number;
}

const getFlattenedPlanList = (
  nodes: Record<string, NodeData>,
  structure: Record<string, string[]>,
  parentId: string,
  currentDepth = 0
): NodeWithDepth[] => {
  const result: NodeWithDepth[] = [];
  const childIds = structure[parentId] || [];

  childIds.forEach((id) => {
    const node = nodes[id];
    if (!node) return;

    result.push({ ...node, depth: currentDepth });

    const children = getFlattenedPlanList(
      nodes,
      structure,
      id,
      currentDepth + 1
    );
    result.push(...children);
  });

  return result;
};

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "ZenKakuGothicNew" },
  title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    borderBottom: "1px solid #f0f0f0",
    paddingBottom: 2,
  },
  nodeTitle: { fontSize: 11 },
});

interface MyDocumentProps {
  title: string;
  description?: string;
  flatNodes: NodeWithDepth[];
  nodes: Record<string, NodeData>;
  locations: Record<string, Location>;
}

const getNodeDisplayName = (
  node: NodeWithDepth,
  nodes: Record<string, NodeData>,
  locations: Record<string, Location>
): string => {
  if (node.name && node.name.trim()) {
    return node.name;
  }

  if (node.locationId) {
    const location = locations?.[node.locationId];

    if (location && location.title && location.title.trim()) {
      return location.title;
    }
  }

  return "（名称未設定）";
};

const MyDocument = ({
  title,
  description,
  flatNodes,
  nodes,
  locations,
}: MyDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{title}</Text>

      {description && (
        <Text style={{ fontSize: 10, marginBottom: 20, color: "#555" }}>
          {description}
        </Text>
      )}

      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            marginBottom: 10,
            borderBottom: "2px solid #333",
          }}
        >
          行程表
        </Text>

        {flatNodes.map((node) => (
          <View key={node.id} style={styles.row}>
            <View style={{ width: node.depth * 15 }} />
            <Text style={styles.nodeTitle}>
              {getNodeDisplayName(node, nodes, locations)}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export interface PDFProps {
  planInfo: {
    title: string;
    description?: string;
  };
  nodes: Record<string, NodeData>;
  structure: Record<string, string[]>;
  locations: Record<string, Location>;
  children: React.ReactNode;
  previewClassName?: string;
}

export default function PDF({
  planInfo,
  nodes,
  structure,
  locations,
  children,
  previewClassName,
}: PDFProps) {
  const [numPages, setNumPages] = useState(0);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const flatNodes = useMemo(
    () => getFlattenedPlanList(nodes, structure, PARENT_ID_ROOT),
    [nodes, structure]
  );

  useEffect(() => {
    const doc = (
      <MyDocument
        title={planInfo.title}
        description={planInfo.description}
        flatNodes={flatNodes}
        nodes={nodes}
        locations={locations}
      />
    );

    let url: string;

    pdf(doc).toBlob().then((blob) => {
      url = URL.createObjectURL(blob);
      setPdfUrl(url);
    });

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [planInfo, flatNodes, nodes, locations]);

  return (
    <div>
      {pdfUrl && (
        <div className={previewClassName}>
          <ShowPDF
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from({ length: numPages }).map((_, i) => (
              <ShowPage
                key={i}
                pageNumber={i + 1}
                width={500}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            ))}
          </ShowPDF>
        </div>
      )}

      <PDFDownloadLink
        document={
          <MyDocument
            title={planInfo.title}
            description={planInfo.description}
            flatNodes={flatNodes}
            nodes={nodes}
            locations={locations}
          />
        }
        fileName="plan.pdf"
      >
        {children}
      </PDFDownloadLink>
    </div>
  );
}