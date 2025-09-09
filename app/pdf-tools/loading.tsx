import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function PDFToolsLoading() {
  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
          <Skeleton className="h-12 w-80 mx-auto mb-2" />
          <Skeleton className="h-6 w-60 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="bg-white/10 backdrop-blur-md border-orange-400/30">
              <CardHeader>
                <Skeleton className="h-8 w-48 mx-auto" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
