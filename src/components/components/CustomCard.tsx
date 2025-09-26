import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface CustomCardProps {
  title: string;
  content?: ReactNode;
}

export default function CustomCard({ title, content }: CustomCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Mi grupo <strong>{title}</strong>
        </CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
