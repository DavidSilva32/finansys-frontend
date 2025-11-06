import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";

interface SummaryCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  valueColor?: string;
  className?: string;
}

const SummaryCard = ({
  title,
  value,
  description,
  icon: Icon,
  valueColor = "text-card-foreground",
  className,
}: SummaryCardProps) => (
  <Card className={`shadow-lg border p-4 ${className}`}>
    <CardHeader className="p-0 border-b-0 pb-0">
      <div className="flex items-center justify-between w-full">
        <CardDescription className="text-sm font-medium text-muted-foreground">
          {title}
        </CardDescription>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
    </CardHeader>

    <CardContent className="mt-2 p-0">
      <div className="flex items-end justify-between">
        <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </CardContent>
  </Card>
);

export { SummaryCard };
