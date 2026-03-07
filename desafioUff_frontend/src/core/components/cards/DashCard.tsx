import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/core/components/shadcnComponents/Ui/card";

interface DashCardProps {
    cardTitle?: string;
    cardDescription?: string;
    cardAction?: React.ReactNode;
    cardFooter?: React.ReactNode;
    cardStyle?: string;
    children: React.ReactNode;
}

export const DashCard: React.FC<DashCardProps> = ({
    cardTitle,
    cardDescription,
    cardAction,
    cardFooter,
    children,
    cardStyle = "w-full"
}) => {
    return (
        <Card className={cardStyle}>
            {(cardTitle || cardDescription || cardAction) && <CardHeader>
                {cardTitle && 
                    (
                        <div className="flex flex-row">
                            <CardTitle>
                                {cardTitle}
                            </CardTitle>
                        </div>
                    )
                }
                {cardDescription && <CardDescription>{cardDescription}</CardDescription>}
                {cardAction && <CardAction>{cardAction}</CardAction>}
            </CardHeader>}

            <CardContent>
                {children}
            </CardContent>
            
            {cardFooter && <CardFooter className="flex-col gap-2">{cardFooter}</CardFooter>}
        </Card>
    )
}