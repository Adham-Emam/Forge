'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Flame,
  CreditCard,
  Shield,
  Zap,
  PencilLine,
  BellRing,
  LockOpen,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Crown,
  Gem,
} from 'lucide-react'
import { motion } from 'framer-motion'

// Ember packages
const emberPackages = [
  {
    id: 'starter',
    name: 'Starter Pack',
    embers: 100,
    price: 9.99,
    bonus: 0,
    popular: false,
    icon: Flame,
    color: 'from-orange-400 to-red-500',
    description: 'Perfect for getting started',
  },
  {
    id: 'creator',
    name: 'Creator Pack',
    embers: 500,
    price: 39.99,
    bonus: 50,
    popular: true,
    icon: Sparkles,
    color: 'from-blue-400 to-purple-500',
    description: 'Most popular choice',
  },
  {
    id: 'professional',
    name: 'Professional Pack',
    embers: 1000,
    price: 69.99,
    bonus: 150,
    popular: false,
    icon: Crown,
    color: 'from-purple-400 to-pink-500',
    description: 'For serious creators',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Pack',
    embers: 2500,
    price: 149.99,
    bonus: 500,
    popular: false,
    icon: Gem,
    color: 'from-yellow-400 to-orange-500',
    description: 'Maximum value',
  },
]

// Payment methods
const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
  { id: 'paypal', name: 'PayPal', icon: Shield },
]

// What you can do with Embers
const emberUses = [
  {
    title: 'Post a Project',
    description: 'Start a new project and attract collaborators or freelancers',
    icon: PencilLine,
    cost: '10-30 Embers',
  },
  {
    title: 'Feature Your Project',
    description: 'Promote your project at the top of search results',
    icon: Zap,
    cost: '20-50 Embers',
  },
  {
    title: 'Highlight Your Proposal',
    description: 'Make your proposal stand out in the client’s inbox',
    icon: Lightbulb,
    cost: '10 Embers per proposal',
  },
  {
    title: 'Access Private Projects',
    description:
      'Unlock exclusive projects that are only visible to premium users',
    icon: LockOpen,
    cost: '25 Embers',
  },
]

const paymentFormSchema = z.object({
  name: z.string().min(1, 'Cardholder name is required'),
  cardNumber: z
    .string()
    .min(16, 'Card number must be 16 digits')
    .max(16, 'Card number must be 16 digits'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format must be MM/YY'),
  cvv: z.string().min(3).max(4),
})

export default function EmbersPage() {
  const [selectedPackage, setSelectedPackage] = useState(emberPackages[1])
  const [customAmount, setCustomAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const form = useForm({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      name: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
    },
  })

  const handlePurchase = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setShowConfirmation(true)
  }

  const totalEmbers = selectedPackage.embers + selectedPackage.bonus

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent/10 via-primary/5 to-background py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-accent to-primary mb-6"
            >
              <Flame className="h-10 w-10 text-white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Fuel Your <span className="molten-text">Creative Journey</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-4">
                Purchase Embers to unlock premium features, boost your projects,
                and accelerate your success on Forge.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                <span>Instant Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                <span>No Expiration</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Package Selection */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Choose Your Ember Package
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {emberPackages.map((pkg) => {
                    const IconComponent = pkg.icon
                    return (
                      <motion.div
                        key={pkg.id}
                        whileHover={{ y: -5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all duration-200 ${
                            selectedPackage.id === pkg.id
                              ? 'border-primary shadow-lg ring-2 ring-primary/20'
                              : 'border-border hover:border-primary/50'
                          } ${pkg.popular ? 'relative' : ''}`}
                          onClick={() => setSelectedPackage(pkg)}
                        >
                          {pkg.popular && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                              <Badge className="bg-accent text-white px-4 py-1">
                                Most Popular
                              </Badge>
                            </div>
                          )}

                          <CardHeader className="text-center pb-4">
                            <div
                              className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-4`}
                            >
                              <IconComponent className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold">{pkg.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {pkg.description}
                            </p>
                          </CardHeader>

                          <CardContent className="text-center">
                            <div className="space-y-2 mb-4">
                              <div className="text-3xl font-bold">
                                ${pkg.price}
                              </div>
                              <div className="flex items-center justify-center gap-2">
                                <span className="text-lg font-medium">
                                  {pkg.embers}
                                </span>
                                <Flame className="h-4 w-4 text-accent" />
                                {pkg.bonus > 0 && (
                                  <>
                                    <span className="text-muted-foreground">
                                      +
                                    </span>
                                    <span className="text-lg font-medium text-green-500">
                                      {pkg.bonus}
                                    </span>
                                    <span className="text-sm text-green-500">
                                      bonus
                                    </span>
                                  </>
                                )}
                              </div>
                              {pkg.bonus > 0 && (
                                <div className="text-sm text-muted-foreground">
                                  Total: {pkg.embers + pkg.bonus} Embers
                                </div>
                              )}
                            </div>

                            <div className="text-sm text-muted-foreground">
                              $
                              {(pkg.price / (pkg.embers + pkg.bonus)).toFixed(
                                3
                              )}{' '}
                              per Ember
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Custom Amount */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Custom Amount</h3>
                  <p className="text-sm text-muted-foreground">
                    Need a different amount? Enter a custom value.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Enter USD amount"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        min="5"
                        step="0.01"
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const amount = parseFloat(customAmount)
                        if (amount >= 5) {
                          const embers = Math.floor(amount * 10) // $1 = 10 Embers
                          setSelectedPackage({
                            id: 'custom',
                            name: 'Custom Package',
                            embers,
                            price: amount,
                            bonus: 0,
                            popular: false,
                            icon: Flame,
                            color: 'from-gray-400 to-gray-600',
                            description: 'Custom amount',
                          })
                        }
                      }}
                      disabled={!customAmount || parseFloat(customAmount) < 5}
                    >
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Minimum purchase: $5.00 (50 Embers)
                  </p>
                </CardContent>
              </Card>

              {/* Payment Form */}
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Payment Information</h3>
                </CardHeader>
                <CardContent>
                  {paymentMethod === 'card' && (
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(handlePurchase)}
                        className="space-y-6"
                      >
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cardholder Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="1234 5678 9012 3456"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="expiry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <FormControl>
                                  <Input placeholder="123" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Button type="submit" disabled={isProcessing}>
                          {isProcessing ? 'Processing...' : 'Pay Now'}
                        </Button>
                      </form>
                    </Form>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        You will be redirected to PayPal to complete your
                        purchase.
                      </p>
                      <Button onClick={handlePurchase} disabled={isProcessing}>
                        {isProcessing
                          ? 'Redirecting...'
                          : 'Checkout with PayPal'}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* What You Can Do */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  What You Can Do with Embers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {emberUses.map((use, index) => {
                    const IconComponent = use.icon
                    return (
                      <Card
                        key={index}
                        className="border-border hover:border-primary/30 transition-colors"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium mb-1">{use.title}</h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                {use.description}
                              </p>
                              <Badge variant="outline" className="text-xs">
                                {use.cost}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Purchase Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-border">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Purchase Summary</h3>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Package:</span>
                        <span className="font-medium">
                          {selectedPackage.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Base Embers:</span>
                        <div className="flex items-center gap-1">
                          <span>{selectedPackage.embers}</span>
                          <Flame className="h-3 w-3 text-accent" />
                        </div>
                      </div>
                      {selectedPackage.bonus > 0 && (
                        <div className="flex justify-between">
                          <span>Bonus Embers:</span>
                          <div className="flex items-center gap-1">
                            <span className="text-green-500">
                              +{selectedPackage.bonus}
                            </span>
                            <Flame className="h-3 w-3 text-green-500" />
                          </div>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total Embers:</span>
                        <div className="flex items-center gap-1">
                          <span>{totalEmbers}</span>
                          <Flame className="h-4 w-4 text-accent" />
                        </div>
                      </div>
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total Price:</span>
                        <span>${selectedPackage.price}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Payment Method
                        </label>
                        <Select
                          value={paymentMethod}
                          onValueChange={setPaymentMethod}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {paymentMethods.map((method) => {
                              const IconComponent = method.icon
                              return (
                                <SelectItem key={method.id} value={method.id}>
                                  <div className="flex items-center gap-2">
                                    <IconComponent className="h-4 w-4" />
                                    <span>{method.name}</span>
                                  </div>
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      <Dialog
                        open={showConfirmation}
                        onOpenChange={setShowConfirmation}
                      >
                        <DialogTrigger asChild>
                          <Button
                            className="w-full"
                            size="lg"
                            onClick={handlePurchase}
                            disabled={isProcessing}
                          >
                            {isProcessing ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: 'linear',
                                  }}
                                  className="mr-2"
                                >
                                  <Flame className="h-4 w-4" />
                                </motion.div>
                                Processing...
                              </>
                            ) : (
                              <>
                                Purchase Embers
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                              Purchase Successful!
                            </DialogTitle>
                            <DialogDescription>
                              Your Embers have been added to your account and
                              are ready to use.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <div className="bg-muted/30 rounded-lg p-4 text-center">
                              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-accent mb-2">
                                <span>{totalEmbers}</span>
                                <Flame className="h-6 w-6" />
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Embers added to your account
                              </p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={() => setShowConfirmation(false)}>
                              Continue
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <div className="text-xs text-muted-foreground text-center">
                        <p>Secure payment powered by Stripe</p>
                        <p>Your Embers never expire</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">What are Embers?</h4>
                  <p className="text-muted-foreground">
                    Embers are Forge&apos;s premium currency that unlock
                    advanced features, boost your projects&apos; visibility, and
                    enhance your experience on the platform.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Do Embers expire?</h4>
                  <p className="text-muted-foreground">
                    No, your Embers never expire. Once purchased, they remain in
                    your account until you use them.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Can I get a refund?</h4>
                  <p className="text-muted-foreground">
                    Ember purchases are generally non-refundable. However, if
                    you experience technical issues, please contact our support
                    team.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">
                    How do I check my Ember balance?
                  </h4>
                  <p className="text-muted-foreground">
                    Your current Ember balance is displayed in your profile and
                    dashboard. You can also view your transaction history in
                    account settings.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
